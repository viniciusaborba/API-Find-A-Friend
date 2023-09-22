import { Org } from "@prisma/client";
import { OrgsRepository } from "../../repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FetchOrgsByCityUseCaseRequest {
  q: string;
}

interface FetchOrgsByCityUseCaseResponse {
  orgs: Org[];
}

export class FetchOrgsByCityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    q,
  }: FetchOrgsByCityUseCaseRequest): Promise<FetchOrgsByCityUseCaseResponse> {
    const postalCode = q.slice(0, 5).trim()

    if (postalCode.length < 5) {
      throw new ResourceNotFoundError()
    }

    const orgs = await this.orgsRepository.findManyByCity(postalCode)

    return {
      orgs,
    };
  }
}
