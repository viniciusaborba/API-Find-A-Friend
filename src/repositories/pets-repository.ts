import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCity(q: string, page: number): Promise<Pet[]>
  findPetById(id: string): Promise<Pet | null>
}