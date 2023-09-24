import { Request, Response } from 'express'

import { TokensRepository } from '../../repositories/TokensRepository'
import { UsersRepository } from '../../repositories/UsersRepository'

import { RefreshTokenUseCase } from '../../useCases/auth/RefreshTokenUseCase'

export class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body

    const usersRepository = new UsersRepository()
    const tokensRepository = new TokensRepository()

    const refreshTokenUseCase = new RefreshTokenUseCase(
      usersRepository,
      tokensRepository
    )

    const { token, refreshToken } = await refreshTokenUseCase.execute(
      refresh_token
    )

    return response.json({ token, refreshToken })
  }
}
