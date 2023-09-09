import { IUsersRepository } from './interfaces/IUsersRepository'
import { User } from '../entities/User'
import { UserModel } from '../models/UserModel'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { AppError } from '../utils/AppError'

export class UsersRepository implements IUsersRepository {
  private Model: typeof UserModel

  constructor() {
    this.Model = UserModel
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.Model.findOne<User>({ id })
    } catch (error) {
      console.error(error)
      throw new AppError('Fail to find a user by email')
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.Model.findOne<User>({ email })
    } catch (error) {
      console.error(error)
      throw new AppError('Fail to find a user by id')
    }
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    try {
      const user = new this.Model({ name, email, password })
      const createdUser = await user.save()
      return createdUser
    } catch (error) {
      console.error(error)
      throw new AppError('Fail to create a user')
    }
  }
}
