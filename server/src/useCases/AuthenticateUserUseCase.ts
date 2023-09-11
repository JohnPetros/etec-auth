import { User } from '../entities/User'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'
import { AppError } from '../utils/AppError'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Validator } from '../utils/Validator'

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

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('User not found', 404)
    }

    const secret = process.env.SECRET

    if (!secret) {
      throw new AppError('Secret is missing', 500)
    }

    const token = sign({}, secret, {
      subject: user._id.toString(),
      expiresIn: '1d',
    })

    return { user, token }
  }
}
