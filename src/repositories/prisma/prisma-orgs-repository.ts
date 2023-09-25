import { Prisma, $Enums } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  
  async findManyByCity(postalCode: string) {
    const org = await prisma.org.findMany({
      where: {
        postal_code: {
          contains: postalCode,
        },
      },
    })

    return org
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      }
    })

    return org
  }
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}