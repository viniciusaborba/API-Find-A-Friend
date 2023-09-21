import { Org } from "@prisma/client";
import { OrgsRepository } from "../../repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  city: string;
  email: string;
  postalCode: string;
  password: string;
  phone: string;
}

interface RegisterUseCaseResponse {
  org: Org;
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    city,
    postalCode,
    password,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
    
    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      city,
      phone,
      postal_code: postalCode,
      password_hash,
    });

    return {
      org,
    };
  }
}
