import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetOrgProfileUseCase } from "../../../use-cases/factories/make-org-profile-use-case";

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const orgProfile = makeGetOrgProfileUseCase()

  const { org } = await orgProfile.execute({
    orgId: req.user.sub
  })

  return res.status(200).send({
    ...org,
    password_hash: undefined,
  })
}