import { Pet } from "@prisma/client";
import { PetsRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FetchAllPetsByCityUseCaseRequest {
  q: string
  page: number
}

interface FetchAllPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FetchAllPetsByCityUseCase {
  constructor(
    private petsRepository: PetsRepository
) {}

  async execute({
    q,
    page
  }: FetchAllPetsByCityUseCaseRequest): Promise<FetchAllPetsByCityUseCaseResponse> {
    const city = q

    if (!city) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByCity(city, page)

    return {
      pets,
    };
  }
}
