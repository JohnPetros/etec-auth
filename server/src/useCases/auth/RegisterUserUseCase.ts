import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

import { AppError } from '../../utils/AppError'
import { Encryptor } from '../../utils/Encryptor'
import { Jwt } from '../../utils/Jwt'
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
  constructor(private usersRepository: IUsersRepository) {}

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

    const jwt = new Jwt()

    const token = jwt.generateToken(createdUser.id)

    if (!token) {
      throw new AppError('token is missing', 500)
    }

    return { user: createdUser, token }
  }
}
