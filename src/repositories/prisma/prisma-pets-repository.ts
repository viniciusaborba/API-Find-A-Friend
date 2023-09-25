import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async findManyByCity(q: string, page: number) {
    const pet = await prisma.pet.findMany({
      where: {
        city: {
          contains: q,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pet
  }
  
  async findPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
  
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

}