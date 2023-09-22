import { Token } from '../../entities/Token'
import { CreateTokenDTO } from '../../dtos/CreateTokenDTO'

export interface ITokensRepository {
  create({ content, expires_in, user_id }: CreateTokenDTO): Promise<Token | null>
  findByUserId(user_id: string): Promise<Token | null>
  findByContent(content: string): Promise<Token | null>
  deleteById(id: string): Promise<void>
}
