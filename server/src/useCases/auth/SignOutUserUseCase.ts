import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'

import { AppError } from '../../utils/AppError'

export class SignOutUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository
  ) {}

  async execute(userId: string, refreshToken: string) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('Usuário não encontrado', 400)
    }

    if (!refreshToken) {
      throw new AppError('Refresh token não fornecido', 400)
    }

    const oldRefreshToken = await this.tokensRepository.findByContent(
      refreshToken
    )

    if (!oldRefreshToken) {
      throw new AppError('Refresh token não fornecido', 400)
    }

    await this.tokensRepository.deleteById(oldRefreshToken.id)
  }
}
