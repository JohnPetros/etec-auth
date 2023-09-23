import { User } from '../../entities/User'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'

export interface IUsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(id: string): Promise<User | null>
  update(new_data: Partial<User>, id: string): Promise<User | null>
  verifyUser(id: string): Promise<void>
  create({ name, email, password }: CreateUserDTO): Promise<User | null>
}
