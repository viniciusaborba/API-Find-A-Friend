import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { GetOrgProfileUseCase } from "../orgs/get-org-profile";
import { GetPetDetailsUseCase } from "../pets/get-pet-details";

export function makeGetPetDetailsUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetDetailsUseCase(orgsRepository, petsRepository);

  return useCase;
}