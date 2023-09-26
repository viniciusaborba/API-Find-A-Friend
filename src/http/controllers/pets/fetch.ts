import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchAllPetsByCityUseCase } from "../../../use-cases/factories/make-fetch-all-pets-by-city-use-case";

export async function fetchByCity(req: FastifyRequest, res: FastifyReply) {
  const FetchByCityBodySchema = z.object({
    q: z.coerce.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { q, page } = FetchByCityBodySchema.parse(req.query)

  const fetchPetsByCityUseCase = makeFetchAllPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({
    q,
    page,
  })
  
  return res.status(200).send({
    pets,
  })
}