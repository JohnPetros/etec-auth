import { Request, Response } from 'express'

import { TokensRepository } from '../../repositories/TokensRepository'
import { UsersRepository } from '../../repositories/UsersRepository'

import { ResetPasswordUseCase } from '../../useCases/auth/ResetPasswordUseCase'

export class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query
    const { user_id } = request.params
    const { new_password } = request.body

    const tokensRepository = new TokensRepository()
    const usersRepository = new UsersRepository()

    const resetPasswordUseCase = new ResetPasswordUseCase(
      tokensRepository,
      usersRepository
    )

    const message = await resetPasswordUseCase.execute(
      String(token),
      user_id,
      new_password
    )

    return response.json({ message })
  }
}
