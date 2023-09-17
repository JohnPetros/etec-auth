import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

import { AppError } from '../../utils/AppError'
import { Validator } from '../../utils/Validator'
import { Jwt } from '../../utils/Jwt'
import { Encryptor } from '../../utils/Encryptor'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: Request): Promise<Response> {
    const validator = new Validator()

    validator.validateSignInUser({ email, password })

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const encryptor = new Encryptor()

    const passwordMatch = await encryptor.compareHash(password, user.password)

    if (!passwordMatch) {
      throw new AppError('User not found', 404)
    }

    const jwt = new Jwt()

    console.log(user)

    const token = jwt.generateToken(user.email)

    if (!token) {
      throw new AppError('token is missing', 500)
    }

    return { user, token }
  }
}
