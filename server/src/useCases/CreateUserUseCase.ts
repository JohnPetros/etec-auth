import { User } from '../entities/User'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'
import { AppError } from '../utils/AppError'
import { Validator } from '../utils/Validator'
import { hash } from 'bcrypt'

interface Request {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    password_confirmation,
  }: Request): Promise<User> {
    const validator = new Validator()

    const errors = validator.validateSignUpUser({
      name,
      email,
      password,
      password_confirmation,
    })

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('E-mail já em uso', 409)
    }

    const passwordHash = await hash(password, 8)

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return createdUser
  }
}
