import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from '../pets/get-pet-details'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetDetailsUseCase

describe('get pet details Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(orgsRepository, petsRepository)
  })

  it('should be able to get pet details by id', async () => {
    const { id } = await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: '123456789',
      postal_code: '00000000',
      city: 'test',
      phone: '00000000000',
    })

    const org_id = id

    const pet = await petsRepository.create({
      name: 'bob',
      city: 'test',
      specie: 'dog',
      org_id,
      description: 'pleasant'
    })
    
    const { details } = await sut.execute({
      petId: pet.id
    })

    expect(details.orgPhone).toEqual('00000000000')
    expect(details.pet.description).toEqual('pleasant')
  })
  
  it('should not be able to get pet details without an id', async () => {
    const { id } = await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: '123456789',
      postal_code: '00000000',
      city: 'test',
      phone: '00000000000',
    })

    const org_id = id

    await petsRepository.create({
      name: 'bob',
      city: 'test',
      specie: 'dog',
      org_id,
      description: 'pleasant'
    })
    
    await expect(() =>
      sut.execute({
        petId: 'nonexisting-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  
})