import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
    public items: Org[] = []
    
    async findById(id: string) {
      const org = this.items.find((item) => item.id === id)

      if (!org) {
        return null
      }

      return org
    }
    
    async create(data: Prisma.OrgCreateInput) {
      const org = {
        id: randomUUID(),
        name: data.name,
        city: data.city,
        email: data.email,
        password_hash: data.password_hash,
        postal_code: data.postal_code,
        phone: data.phone,
        created_at: new Date(),
        role: data.role || 'USER'
      }

      this.items.push(org)

      return org
    }
    async findByEmail(email: string) {
      const org = this.items.find((item) => item.email === email)

      if (!org) {
        return null
      }

      return org
    }
}