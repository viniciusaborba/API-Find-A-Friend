import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";
import { OrgAlreadyExistsError } from "../../../use-cases/errors/org-already-exists-error";
import { makeRegisterPetUseCase } from "../../../use-cases/factories/make-register-pet-use-case";

export async function registerPet(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    specie: z.string(),
    description: z.string().optional(),
    city: z.string(),
  })

  const registerParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const { name, specie, description, city } = registerBodySchema.parse(req.body)

  const { orgId } = registerParamsSchema.parse(req.params)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    orgId,
    name,
    city,
    specie,
    description,
  })
  
  return res.status(201).send()
}