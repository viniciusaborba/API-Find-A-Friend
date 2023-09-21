import { expect, it, describe, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { RegisterUseCase } from '../orgs/register'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })
  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'test',
      email: 'test@email.com',
      password: '123456789',
      city: 'test',
      postalCode: '00000000',
      phone: '00000000000'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be able to hash user password upon registration', async () => {
    const { org } = await sut.execute({
        name: 'test',
        email: 'test@email.com',
        password: '123456789',
        city: 'test',
        postalCode: '00000000',
        phone: '00000000000'
    })

    const isPasswordHashedCorrectly = await compare(
      '123456789',
      org.password_hash,
    )

    expect(isPasswordHashedCorrectly).toBe(true)
  })

  it('should not be able to register same email twice', async () => {
    const email = 'test@email.com'

    await sut.execute({
      name: 'test',
      email,
      password: '123456789',
      city: 'test',
      postalCode: '00000000',
      phone: '00000000000'
    })

    await expect(() =>
     sut.execute({
      name: 'test',
      email,
      password: '123456789',
      city: 'test',
      postalCode: '00000000',
      phone: '00000000000'
    })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})