import { Request, Response } from 'express'
import { UsersRepository } from '../../repositories/UsersRepository'
import { SignInUserUseCase } from '../../useCases/auth/SignInUserUseCase'
import { TokensRepository } from '../../repositories/TokensRepository'

export class SignInController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const usersRepository = new UsersRepository()
    const tokensRepository = new TokensRepository()

    const signInUserUseCase = new SignInUserUseCase(
      usersRepository,
      tokensRepository
    )

    const { user, token, refreshToken } = await signInUserUseCase.execute({
      email,
      password,
    })

    return response.json({ user, token, refreshToken })
  }
}
