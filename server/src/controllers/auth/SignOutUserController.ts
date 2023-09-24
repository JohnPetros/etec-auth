import { Request, Response } from 'express'

import { UsersRepository } from '../../repositories/UsersRepository'
import { TokensRepository } from '../../repositories/TokensRepository'

import { SignOutUserUseCase } from '../../useCases/auth/SignOutUserUseCase'

export class SignOutController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.params

    const usersRepository = new UsersRepository()
    const tokensRepository = new TokensRepository()

    const signOutUserUseCase = new SignOutUserUseCase(
      usersRepository,
      tokensRepository
    )

    await signOutUserUseCase.execute(user_id)

    return response.send()
  }
}
