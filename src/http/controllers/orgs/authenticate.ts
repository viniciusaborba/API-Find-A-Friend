import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateCase } from "../../../use-cases/factories/make-authenticate-use-case";
import { InvalidCredentialError } from "../../../use-cases/errors/invalid-credential-error";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  })

  const { email, password } = registerBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateCase()

    const { org } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await res.jwtSign(
      {
        role: org.role
      },
      {
        sign: {
          sub: org.id
        }
      }
    )

    const refreshToken = await res.jwtSign(
      {
        role: org.role
      },
      {
        sign: {
          sub: org.id,
          expiresIn: '7d'
        }
      }
    )

    return res.setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
     .status(200)
     .send({
        token,
     })
  
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return res.status(409).send({ message: err.message })
    }

    throw err
  }
}