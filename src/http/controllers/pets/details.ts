import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetPetDetailsUseCase } from "../../../use-cases/factories/make-get-pet-details";

export async function petDetails(req: FastifyRequest, res: FastifyReply) {
  const registerParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = registerParamsSchema.parse(req.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  const { details } = await getPetDetailsUseCase.execute({
    petId,
  })

  Reflect.deleteProperty(details.pet, 'org_id')
  Reflect.deleteProperty(details.pet, 'id')

  return res.status(200).send(details)
}