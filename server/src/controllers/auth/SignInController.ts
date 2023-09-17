import { Request, Response } from 'express'
import { UsersRepository } from '../../repositories/UsersRepository'
import { AuthenticateUserUseCase } from '../../useCases/auth/AuthenticateUserUseCase'
import { TokensRepository } from '../../repositories/TokensRepository'

export class SignInController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const usersRepository = new UsersRepository()
    const tokensRepository = new TokensRepository()
    
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      tokensRepository
    )

    const { user, token } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    return response.json({ user, token })
  }
}
