import { TokensRepositoryInMemory } from '../../../repositories/in-memory/TokensRepositoryInMemory'
import { UsersRepositoryInMemory } from '../../../repositories/in-memory/UsersRepositoryInMemory'
import { AppError } from '../../../utils/AppError'
import { Encryptor } from '../../../utils/Encryptor'
import { SignInUserUseCase } from '../SignInUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let tokensRepositoryInMemory: TokensRepositoryInMemory
let signInUserUseCase: SignInUserUseCase

describe('SignIn User Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    tokensRepositoryInMemory = new TokensRepositoryInMemory()
    signInUserUseCase = new SignInUserUseCase(
      usersRepositoryInMemory,
      tokensRepositoryInMemory
    )
  })

  it('should not sign in a user that does not exist (email)', async () => {
    await expect(
      signInUserUseCase.execute({
        email: 'mock@email.com',
        password: 'mockJP77$',
      })
    ).rejects.toEqual(new AppError('Usuário não encontrado', 401))
  })

  it('should not sign in a user that does not exist (password)', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'correctJP77$',
    }
    await usersRepositoryInMemory.create(user)

    await expect(
      signInUserUseCase.execute({
        email: user.email,
        password: 'wrongJP77$',
      })
    ).rejects.toEqual(new AppError('Usuário não encontrado', 401))
  })

  it('should sign in a user', async () => {
    const encryptor = new Encryptor()

    const password = 'passwordJP77$'

    const passwordHash = await encryptor.generateHash(password)

    const user = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: passwordHash,
    }
    await usersRepositoryInMemory.create(user)

    const response = await signInUserUseCase.execute({
      email: user.email,
      password: password,
    })

    expect(response).toHaveProperty('user')
    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('refreshToken')
  })
})
