import request from 'supertest'
import { app } from '../../../app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Authenticate org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'test',
      email: 'test@email.com',
      password: '123456789',
      city: 'test',
      postalCode: '00000000',
      phone: '00000000000'
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'test@email.com',
      password: '123456789',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})