import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  
  async findManyByCity(q: string, page: number) {
    const postalCode = q.slice(0, 5)

    return this.items.filter((item) => 
      item.city.includes(postalCode) ? item : null
    )
    .slice((page - 1) * 20, page * 20)
  }
  
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      city: data.city,
      description: data.description ?? null,
      org_id: data.org_id,
      specie: data.specie,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}