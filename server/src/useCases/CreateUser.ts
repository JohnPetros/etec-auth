import { User } from '../entities/User'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'

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

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password,
    })

    return createdUser
  }
}
