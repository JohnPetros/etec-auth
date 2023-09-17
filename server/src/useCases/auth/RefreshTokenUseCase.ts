import { AppError } from '../../utils/AppError'
import { Jwt } from '../../utils/Jwt'
import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { Time } from '../../utils/Time'

interface Response {
  token: string
  refresh_token: string
}

export class RefreshTokenUserUseCase {
  constructor(private tokensRepository: ITokensRepository) {}

  async execute(token: string): Promise<Response> {
    if (!token) {
      throw new AppError('token inválido', 400)
    }

    const jwt = new Jwt()

    const userId = jwt.verifyToken(token)

    if (!userId) {
      throw new AppError('user não encontrado', 404)
    }

    const oldToken = await this.tokensRepository.findByUserId(userId)

    if (!oldToken) {
      throw new AppError('refresh token não foi encontrado', 404)
    }

    await this.tokensRepository.deleteById(oldToken.id)

    const refreshToken = await jwt.generateRefreshToken(userId)

    if (!refreshToken) {
      throw new AppError('refresh token não pôde ser criado', 500)
    }

    const time = new Time()

    await this.tokensRepository.create({
      content: refreshToken,
      user_id: userId,
      expires_in: time.addDays(jwt.refreshTokenExpiresIn),
    })

    return { token, refresh_token: refreshToken }
  }
}
