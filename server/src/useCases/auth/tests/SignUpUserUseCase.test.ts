import { TokensRepositoryInMemory } from '../../../repositories/in-memory/TokensRepositoryInMemory'
import { UsersRepositoryInMemory } from '../../../repositories/in-memory/UsersRepositoryInMemory'

import { MailService } from '../../../services/MailService'
import { SignUpUserUseCase } from '../SignUpUserUseCase'

import { AppError } from '../../../utils/AppError'

let usersRepositoryInMemory: UsersRepositoryInMemory
let tokensRepositoryInMemory: TokensRepositoryInMemory
let signUpUserUseCase: SignUpUserUseCase
let mailService: MailService

describe('SignUp User Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    tokensRepositoryInMemory = new TokensRepositoryInMemory()
    signUpUserUseCase = new SignUpUserUseCase(
      usersRepositoryInMemory,
      tokensRepositoryInMemory,
      mailService
    )
  })

  it('should not sign up a user that already exists', async () => {
    const user = {
      name: 'Jonh Doe',
      email: 'mock@email.com',
      password: 'mockJP77$',
    }

    await usersRepositoryInMemory.create(user)

    await expect(
      signUpUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
      })
    ).rejects.toEqual(new AppError('E-mail já em uso', 401))
  })
})
