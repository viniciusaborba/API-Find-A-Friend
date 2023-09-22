import { Pet } from "@prisma/client";
import { OrgsRepository } from "../../repositories/orgs-repository";
import { PetsRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface RegisterPetUseCaseRequest {
  orgId: string
  name: string;
  city: string;
  specie: string;
  description?: string | null
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository
) {}

  async execute({
    orgId,
    name,
    city,
    specie,
    description,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      org_id: org.id,
      name,
      city,
      specie,
      description,
    })

    return {
      pet,
    };
  }
}
