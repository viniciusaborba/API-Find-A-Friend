import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { OrgAlreadyExistsError } from "../../../use-cases/errors/org-already-exists-error";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    phone: z.coerce.string().min(11).max(11),
    postalCode: z.string().regex(/^\d{5}-?\d{3}$/),
    city: z.string(),
  })

  const { name, email, password, phone, postalCode, city } = registerBodySchema.parse(req.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      postalCode,
      city
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }

    throw err
  }
  
  return res.status(201).send()
}