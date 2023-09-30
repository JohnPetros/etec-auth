import { User } from '../../entities/User'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'

export interface IUsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(id: string): Promise<User | null>
  incrementAuthAttempts(
    currentAttempts: number,
    id: string
  ): Promise<void>
  resetAuthAttempts(
    id: string
  ): Promise<void>
  update(new_data: Partial<User>, id: string): Promise<User | null>
  verifyUser(id: string): Promise<void>
  blockUser(id: string, util_date: Date): Promise<void>
  unBlockUser(id: string): Promise<void>
  create({ name, email, password }: CreateUserDTO): Promise<User | null>
}
