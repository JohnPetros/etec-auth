import { User } from '../../entities/User'
import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { AppError } from '../../utils/AppError'
import { Jwt } from '../../utils/Jwt'
import { Time } from '../../utils/Time'
import { Validator } from '../../utils/Validator'

interface Response {
  user: User
  token: string
  refreshToken: string
}

export class ConfirmUserEmailUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository
  ) {}

  async execute(
    email: string,
    emailToken: string
  ): Promise<Response> {
    if (!emailToken) {
      new AppError('Token inválido', 400)
    }

    const validator = new Validator()

    validator.validateEmail(email)

    const jwt = new Jwt()

    try {
      jwt.verifyEmailToken(emailToken)
    } catch (error) {
      new AppError('Token expirado', 401)
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não encontrado', 400)
    }

    const oldEmailToken = await this.tokensRepository.findByUserId(user.id)

    if (!oldEmailToken) {
      new AppError('Token não encontrado', 400)
    }

    if (oldEmailToken) {
      this.tokensRepository.deleteById(oldEmailToken.id)
    }

    const authToken = jwt.generateAuthToken(user.id)

    if (!authToken) {
      throw new AppError('Erro ao criar token de autenticação', 500)
    }

    const refreshToken = jwt.generateRefreshToken(user.id)

    if (!refreshToken) {
      throw new AppError('Refresh token não pôde ser criado', 500)
    }

    const time = new Time()

    await this.tokensRepository.create({
      content: refreshToken,
      user_id: user.id,
      expires_in: time.addDays(jwt.refreshTokenExpiresIn),
    })

    await this.usersRepository.verifyUser(user.id)

    return { user, token: authToken, refreshToken }
  }
}
