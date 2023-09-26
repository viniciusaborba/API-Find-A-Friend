import request from 'supertest'
import { app } from '../../../app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateOrg } from '../../../utils/test/create-and-authenticate-org'
import { prisma } from '../../../lib/prisma'

describe('Fetch all pets in the same city (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets in the same city', async () => {
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
    
    await prisma.pet.create({
      data: {
        name: 'sugarfoot',
        specie: 'horse',
        city: 'test',
        org_id: id,
      }
    })

    const search = await prisma.pet.findFirst({
      where: {
        specie: 'dog',
      }
    })

    const response = await request(app.server)
      .get('/pets/list')
      .query({
        q: 'test',
        page: 1,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(search).toEqual(
      expect.objectContaining({
        name: 'bob',
      }),
    )
  })
})