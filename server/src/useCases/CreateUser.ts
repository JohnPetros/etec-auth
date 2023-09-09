import { User } from '../entities/User'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'
import { AppError } from '../utils/AppError'

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
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('Email already in use', 409)
    }

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password,
    })

    return createdUser
  }
}
