import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { RegisterPetUseCase } from '../pets/register'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { FetchOrgsByCityUseCase } from '../orgs/fetch-orgs-by-city'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: FetchOrgsByCityUseCase

describe('fetch orgs by city Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchOrgsByCityUseCase(orgsRepository)
  })
  it('should be able to list orgs with same postal code', async () => {
    await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: '123456789',
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })
    
    await orgsRepository.create({
      name: 'test2',
      email: 'test2@email.com',
      password_hash: '123456789',
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })

    const { orgs } = await sut.execute({
      q: '00000'
    })

    expect(orgs).toHaveLength(2)
    expect(orgs).toEqual([
      expect.objectContaining({ name: 'test' }),
      expect.objectContaining({ name: 'test2' }),
    ])
  })

  it('should not be able to list orgs without postal code', async () => {
    await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: '123456789',
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })
      
    await orgsRepository.create({
      name: 'test2',
      email: 'test2@email.com',
      password_hash: '123456789',
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })

    await expect(() =>
      sut.execute({
        q: '',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})