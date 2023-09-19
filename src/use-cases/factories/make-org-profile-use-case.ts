import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { GetOrgProfileUseCase } from "../orgs/get-org-profile";

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new GetOrgProfileUseCase(orgsRepository);

  return useCase;
}