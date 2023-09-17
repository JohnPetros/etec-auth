import { Request, Response } from 'express'
import { UsersRepository } from '../../repositories/UsersRepository'
import { AuthenticateUserUseCase } from '../../useCases/auth/AuthenticateUserUseCase'

export class SignInController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const usersRepository = new UsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    const { user, token } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    return response.json({ user, token })
  }
}
