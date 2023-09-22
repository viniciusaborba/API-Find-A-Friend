import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { RegisterPetUseCase } from '../pets/register'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('register pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(orgsRepository, petsRepository)
  })
  it('should be able to register a pet', async () => {
    const { id } = await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: '123456789',
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })

    const orgId = id

    const { pet } = await sut.execute({
      orgId,
      name: 'bob',
      city: 'test',
      specie: 'dog'
    })

    expect(pet.org_id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet without org id', async () => {
    await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: '123456789',
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })

    await expect(() => 
      sut.execute({
        orgId: 'non-existing-id',
        name: 'bob',
        city: 'test',
        specie: 'dog',
      })    
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})