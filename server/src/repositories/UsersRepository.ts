import { IUsersRepository } from './interfaces/IUsersRepository'
import { User } from '../entities/User'
import { UserModel } from '../models/UserModel'
import { CreateUserDTO } from '../dtos/CreateUserDTO'

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

    const createdUser = await user.save()

    return createdUser
  }
}
