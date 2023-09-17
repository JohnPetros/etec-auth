import { User } from '../../entities/User'
import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

import { AppError } from '../../utils/AppError'
import { Encryptor } from '../../utils/Encryptor'
import { Jwt } from '../../utils/Jwt'
import { Time } from '../../utils/Time'
import { Validator } from '../../utils/Validator'

interface Request {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface Response {
  user: User
  token: string
}

export class RegisterUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository
  ) {}

  async execute({
    name,
    email,
    password,
    password_confirmation,
  }: Request): Promise<Response> {
    const validator = new Validator()

    validator.validateSignUpUser({
      name,
      email,
      password,
      password_confirmation,
    })

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('E-mail já em uso', 409)
    }

    const encryptor = new Encryptor()

    const passwordHash = await encryptor.generateHash(password)

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    if (!createdUser) {
      throw new AppError('error ao salvar dados de usupario', 500)
    }

    const jwt = new Jwt()

    const token = jwt.generateToken(createdUser.id)

    if (!token) {
      throw new AppError('error ao criar token de autenticação', 500)
    }

    const refreshToken = await jwt.generateRefreshToken(createdUser.id)

    if (!refreshToken) {
      throw new AppError('refresh token não pôde ser criado', 500)
    }

    const time = new Time()

    await this.tokensRepository.create({
      content: refreshToken,
      user_id: createdUser.id,
      expires_in: time.addDays(jwt.refreshTokenExpiresIn),
    })

    return { user: createdUser, token }
  }
}
