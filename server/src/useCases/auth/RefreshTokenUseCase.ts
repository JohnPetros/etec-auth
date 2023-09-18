import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

import { AppError } from '../../utils/AppError'
import { Jwt } from '../../utils/Jwt'
import { Time } from '../../utils/Time'

export class RefreshTokenUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository
  ) {}

  async execute(refreshToken: string): Promise<string> {
    if (!refreshToken) {
      throw new AppError('refresh token não fornecido', 401)
    }

    const jwt = new Jwt()

    const userId = jwt.verifyRefreshToken(refreshToken)

    if (!userId) {
      throw new AppError('usuário não encontrado', 401)
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('usuário não encontrado', 401)
    }

    const oldToken = await this.tokensRepository.findByUserId(userId)

    if (!oldToken) {
      throw new AppError('refresh token não encontrado', 401)
    }

    await this.tokensRepository.deleteById(oldToken.id)

    const newRefreshToken = jwt.generateRefreshToken(userId)

    if (!newRefreshToken) {
      throw new AppError('refresh token não pôde ser criado', 500)
    }

    const time = new Time()

    await this.tokensRepository.create({
      content: newRefreshToken,
      user_id: userId,
      expires_in: time.addDays(jwt.refreshTokenExpiresIn),
    })

    const newToken = jwt.generateToken(userId)

    if (!newToken) {
      throw new AppError('novo token não pôde ser criado', 500)
    }

    return newToken
  }
}
