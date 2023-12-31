import request from 'supertest'
import { app } from '../../../app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'test',
      email: 'test@email.com',
      password: '123456789',
      city: 'test',
      postalCode: '00000000',
      phone: '00000000000'
    })

    expect(response.statusCode).toEqual(201)
  })
})