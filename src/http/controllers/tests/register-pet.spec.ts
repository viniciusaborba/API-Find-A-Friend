import request from 'supertest'
import { app } from '../../../app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrg } from '../../../utils/test/create-and-authenticate-org'
import { prisma } from '../../../lib/prisma'

describe('Register pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)

    const { id } = await prisma.org.findFirstOrThrow()

    const response = await request(app.server)
      .post(`/pets/${id}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'bob',
        specie: 'dog',
        city: 'test',
      })

    expect(response.statusCode).toEqual(201)
  })
})