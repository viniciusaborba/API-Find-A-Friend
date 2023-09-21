import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from '../orgs/authenticate'
import { InvalidCredentialError } from '../errors/invalid-credential-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })
 
  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: await hash('123456789', 6),
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })
    
    const { org } = await sut.execute({
      email: 'test@email.com',
      password: '123456789',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: await hash('123456789', 6),
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })
  
    await expect(() =>
      sut.execute({
        email: 'test@email.com',
        password: '123456781',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})