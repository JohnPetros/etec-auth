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
        is_verified: user?.is_verified,
        auth_attempts: user.auth_attempts,
        blocked_util: user.blocked_util,
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
        is_verified: user?.is_verified,
        auth_attempts: user?.auth_attempts,
        blocked_util: user?.blocked_util,
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

  async verifyUser(id: string): Promise<void> {
    await this.Repository.findOneAndUpdate({ _id: id }, { is_verified: true })
  }

  async blockUser(id: string, util_date: Date): Promise<void> {
    await this.Repository.findOneAndUpdate(
      { _id: id },
      { blocked_util: util_date }
    )
  }
  async unBlockUser(id: string): Promise<void> {
    await this.Repository.findOneAndUpdate({ _id: id }, { blocked_util: null })
  }

  async resetAuthAttempts(id: string): Promise<void> {
    await this.Repository.findOneAndUpdate({ _id: id }, { auth_attempts: 1 })
  }

  async incrementAuthAttempts(
    currentAttempts: number,
    id: string
  ): Promise<void> {
    await this.Repository.findOneAndUpdate(
      { _id: id },
      { auth_attempts: currentAttempts + 1 }
    )
  }
}
