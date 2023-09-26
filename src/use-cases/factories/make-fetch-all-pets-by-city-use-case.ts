import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { GetOrgProfileUseCase } from "../orgs/get-org-profile";
import { FetchAllPetsByCityUseCase } from "../pets/fetch-all-pets-by-city";
import { GetPetDetailsUseCase } from "../pets/get-pet-details";

export function makeFetchAllPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchAllPetsByCityUseCase(petsRepository);

  return useCase;
}