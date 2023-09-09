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
    return await this.Model.findOne<User>({ id })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.Model.findOne<User>({ email })
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = new this.Model({ name, email, password })

    try {
      const createdUser = await user.save()
      return createdUser
    } catch (error) {
      console.error(error)
      throw new AppError('Fail to create a user', 500)
    }
  }
}
