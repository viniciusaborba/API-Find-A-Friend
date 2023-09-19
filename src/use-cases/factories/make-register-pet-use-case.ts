import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../pets/register";

export function makeRegisterPetUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository()

  const useCase = new RegisterPetUseCase(orgsRepository, petsRepository);

  return useCase;
}
