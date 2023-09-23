import { Request, Response } from 'express'

import { TokensRepository } from '../../repositories/TokensRepository'
import { UsersRepository } from '../../repositories/UsersRepository'

import { ConfirmUserEmailUseCase } from '../../useCases/auth/ConfirmUserEmailUseCase'

export class ConfirmUserEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const emailToken = request.headers.authorization

    const usersRepository = new UsersRepository()
    const tokensRepository = new TokensRepository()

    const confirmUserEmailUseCase = new ConfirmUserEmailUseCase(
      usersRepository,
      tokensRepository
    )

    const { user, token, refreshToken } = await confirmUserEmailUseCase.execute(
      email,
      String(emailToken)
    )

    return response.json({ user, token, refreshToken })
  }
}
