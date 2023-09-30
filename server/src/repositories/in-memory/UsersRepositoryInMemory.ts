import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../interfaces/IUsersRepository'
import { v4 as uuid } from 'uuid'

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  private updateUser(targetUser: User, updatedData: Partial<User>) {
    this.users = this.users.map((user) =>
      user.id === targetUser.id ? { ...targetUser, ...updatedData } : user
    )
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    if (!user) return null

    return user
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) return null

    return user
  }

  async incrementAuthAttempts(
    currentAttempts: number,
    id: string
  ): Promise<void> {
    const targetUser = await this.findById(id)

    if (targetUser)
      this.updateUser(targetUser, { auth_attempts: currentAttempts + 1 })
  }

  async resetAuthAttempts(id: string): Promise<void> {
    const targetUser = await this.findById(id)

    if (targetUser) this.updateUser(targetUser, { auth_attempts: 0 })
  }

  async updatePassword(password: string, id: string): Promise<User | null> {
    const targetUser = await this.findById(id)

    if (targetUser) {
      const updatedTargetUser = {
        ...targetUser,
        password,
      }

      this.updateUser(targetUser, { password })

      return updatedTargetUser
    }

    return null
  }

  async verifyUser(id: string): Promise<void> {
    const targetUser = await this.findById(id)

    if (targetUser) this.updateUser(targetUser, { is_verified: true })
  }

  async blockUser(id: string, util_date: Date): Promise<void> {
    const targetUser = await this.findById(id)

    if (targetUser) this.updateUser(targetUser, { blocked_util: util_date })
  }

  async unBlockUser(id: string): Promise<void> {
    const targetUser = await this.findById(id)

    if (targetUser) this.updateUser(targetUser, { blocked_util: null })
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User | null> {
    const newUser = {
      id: uuid(),
      name,
      email,
      password,
      is_verified: false,
      auth_attempts: 0,
      blocked_util: null,
    }

    this.users.push(newUser)

    return newUser
  }
}
