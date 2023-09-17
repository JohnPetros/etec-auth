import { User } from '../../entities/User'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'

export interface IUsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(id: string): Promise<User | null>
  create({ name, email, password }: CreateUserDTO): Promise<User | null>
}
