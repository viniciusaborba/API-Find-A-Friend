import request from 'supertest'
import { app } from '../../../app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrg } from '../../../utils/test/create-and-authenticate-org'
import { prisma } from '../../../lib/prisma'

describe('Get pet details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pet details', async () => {
    await createAndAuthenticateOrg(app, true)

    const { id } = await prisma.org.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        name: 'bob',
        specie: 'dog',
        city: 'test',
        org_id: id,
      }
    })

    const pet = await prisma.pet.findFirst({
      where: {
        specie: 'dog',
      }
    })

    const response = await request(app.server)
      .get(`/pets/${pet?.id}/details`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          name: 'bob',
        }),
      }),
    )
  })
})