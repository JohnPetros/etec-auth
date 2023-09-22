import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

import { AppError } from '../../utils/AppError'
import { Validator } from '../../utils/Validator'
import { Jwt } from '../../utils/Jwt'
import { Encryptor } from '../../utils/Encryptor'
import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { Time } from '../../utils/Time'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
  refreshToken: string
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository
  ) {}

  async execute({ email, password }: Request): Promise<Response> {
    const validator = new Validator()

    validator.validateSignInUser({ email, password })

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const encryptor = new Encryptor()

    const passwordMatch = await encryptor.compareHash(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const jwt = new Jwt()

    const token = jwt.generateToken(user.id)

    if (!token) {
      throw new AppError('Erro ao criar token de autenticação', 500)
    }

    const oldToken = await this.tokensRepository.findByUserId(user.id)

    if (oldToken) {
      this.tokensRepository.deleteById(oldToken.id)
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

    return { user, token, refreshToken }
  }
}
