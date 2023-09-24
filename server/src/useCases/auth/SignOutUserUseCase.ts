import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'

import { AppError } from '../../utils/AppError'

export class SignOutUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('Usuário não encontrado', 401)
    }

    const oldRefreshToken = await this.tokensRepository.findByUserId(userId)

    if (!oldRefreshToken) {
      throw new AppError('Refresh token não encontrado', 401)
    }

    await this.tokensRepository.deleteById(oldRefreshToken.id)
  }
}
