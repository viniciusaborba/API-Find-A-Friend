import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { FetchAllPetsByCityUseCase } from '../pets/fetch-all-pets-by-city'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchAllPetsByCityUseCase

describe('fetch all pets by city Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchAllPetsByCityUseCase(petsRepository)
  })

  it('should be able to list all pets from same city', async () => {
    await orgsRepository.create({
      id: 'test',
      name: 'test',
      email: 'test@email.com',
      password_hash: '123456789',
      postal_code: '00000000',
      city: 'test',
      phone: '00000000000',
    })

    await petsRepository.create({
      name: 'bob',
      city: 'test',
      specie: 'dog',
      org_id: 'test'
    })
    
    await petsRepository.create({
      name: 'sugarfoot',
      city: 'test',
      specie: 'horse',
      org_id: 'test2'
    })

    const { pets } = await sut.execute({
       q: 'test',
       page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'bob' }),
      expect.objectContaining({ name: 'sugarfoot' })
    ])
  })

  it('should be able to list paginated pets search', async () => {
    await orgsRepository.create({
      id: 'test',
      name: 'test',
      email: 'test@email.com',
      password_hash: '123456789',
      postal_code: '00000000',
      city: 'test',
      phone: '00000000000',
    })

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `pet-${i}`,
        city: 'test',
        specie: 'dog',
        org_id: 'test',
      })
    }

    const { pets } = await sut.execute({
      q: 'test',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'pet-21' }),
      expect.objectContaining({ name: 'pet-22' }),
    ])
  })
  
})