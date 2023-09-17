import { User } from '../entities/User'
import { IUsersRepository } from './interfaces/IUsersRepository'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { UserModel } from '../models/UserModel'

import { AppError } from '../utils/AppError'
import { v4 as uuid } from 'uuid'

export class UsersRepository implements IUsersRepository {
  private Repository: typeof UserModel

  constructor() {
    this.Repository = UserModel
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.Repository.findOne({ id })

      if (!user) {
        throw new AppError('Failed to find a user by id')
      }

      return {
        id: user._id.toHexString(),
        email: user?.email,
        name: user?.name,
        password: user?.password,
      }
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to find a user by email')
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.Repository.findOne({ email })

      if (!user) {
        throw new AppError('Failed to find a user by id')
      }

      return {
        id: user._id.toHexString(),
        email: user?.email,
        name: user?.name,
        password: user?.password,
      }
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
