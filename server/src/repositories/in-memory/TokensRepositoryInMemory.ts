import { CreateTokenDTO } from '../../dtos/CreateTokenDTO'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { ITokensRepository } from '../interfaces/ITokensRepository'

import { Token } from '../../entities/Token'
import { User } from '../../entities/User'

import { v4 as uuid } from 'uuid'

export class TokensRepositoryInMemory implements ITokensRepository {
  private tokens: Token[] = []

  async create({
    content,
    expires_in,
    user_id,
  }: CreateTokenDTO): Promise<Token | null> {
    const newToken: Token = {
      id: uuid(),
      content,
      expires_in,
      user_id,
    }

    this.tokens.push(newToken)

    return newToken
  }
  async findByUserId(user_id: string): Promise<Token | null> {
    const token = this.tokens.find((token) => token.user_id === user_id)

    if (token) return token

    return null
  }
  async findByContent(content: string): Promise<Token | null> {
    const token = this.tokens.find((token) => token.content === content)

    if (token) return token

    return null
  }

  async deleteById(id: string): Promise<void> {
    this.tokens = this.tokens.filter((token) => token.id !== id)
  }
}
