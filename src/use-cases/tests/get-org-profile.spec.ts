import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { GetOrgProfileUseCase } from '../orgs/get-org-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get org profile use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })
 
  it('should be able to authenticate', async () => {
    const orgCreated = await orgsRepository.create({
      name: 'test',
      email: 'test@email.com',
      password_hash: await hash('123456789', 6),
      city: 'test',
      postal_code: '00000000',
      phone: '00000000000'
    })
    
    const { org } = await sut.execute({
      orgId: orgCreated.id
    })

    expect(org!.name).toEqual('test')
  })

  it('should not be able to authenticate with wrong id', async () => {
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
        orgId: 'non-existing-id',
      }) 
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})