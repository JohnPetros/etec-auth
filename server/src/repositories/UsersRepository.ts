import { User } from '../entities/User'
import { IUsersRepository } from './interfaces/IUsersRepository'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { UserModel } from '../models/UserModel'

import { AppError } from '../utils/AppError'

export class UsersRepository implements IUsersRepository {
  private Repository: typeof UserModel

  constructor() {
    this.Repository = UserModel
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.Repository.findOne({ _id: id })

      if (!user) {
        return null
      }

      return {
        id: user._id.toHexString(),
        email: user?.email,
        name: user?.name,
        password: user?.password,
      }
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao tentar encontrar usuário por e-mail')
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.Repository.findOne({ email })

      if (!user) {
        return null
      }

      return {
        id: user._id.toHexString(),
        email: user?.email,
        name: user?.name,
        password: user?.password,
      }
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao tentar encontrar usuário por id')
    }
  }

  async update(new_data: Partial<User>, id: string): Promise<User | null> {
    try {
      await this.Repository.findOneAndUpdate({ _id: id }, { ...new_data })

      return await this.findById(id)
    } catch (error) {
      throw new AppError('Erro ao tentar atualizar dados de usuário')
    }
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User | null> {
    try {
      const user = new this.Repository({ name, email, password })

      const createdUser = await user.save()

      return await this.findByEmail(createdUser.email)
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao tentar criar usuário')
    }
  }
}
