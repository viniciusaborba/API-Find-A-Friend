import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance, isAdmin = false) {
  await prisma.org.create({
    data: {
      name: 'test',
      email: 'test@email.com',
      password_hash: await hash('123456789', 6),
      phone: '12121212121',
      city: 'test',
      postal_code: '12345-678',
      role: isAdmin ? 'ADMIN' : 'USER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'test@email.com',
    password: '123456789',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}