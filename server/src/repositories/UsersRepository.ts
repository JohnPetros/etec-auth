import { IUsersRepository } from './interfaces/IUsersRepository'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { User } from '../entities/User'
import { UserModel } from '../models/UserModel'
import { AppError } from '../utils/AppError'

export class UsersRepository implements IUsersRepository {
  private Repository: typeof UserModel

  constructor() {
    this.Repository = UserModel
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.Repository.findOne<User>({ id })
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to find a user by email')
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.Repository.findOne<User>({ email })
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to find a user by id')
    }
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    try {
      const user = new this.Repository({ name, email, password })
      const createdUser = await user.save()
      return createdUser
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to create a user')
    }
  }
}
