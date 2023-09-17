import { Token } from '../entities/Token'
import { TokenModel } from '../models/TokenModel'
import { ITokensRepository } from './interfaces/ITokensRepository'

import { AppError } from '../utils/AppError'

import { CreateTokenDTO } from '../dtos/CreateTokenDTO'

export class TokensRepository implements ITokensRepository {
  private Repository: typeof TokenModel

  constructor() {
    this.Repository = TokenModel
  }

  async deleteById(id: string): Promise<void> {
    await this.Repository.deleteOne({ id })
  }

  async findByUserId(user_id: string): Promise<Token | null> {
    return await this.Repository.findOne<Token>({ user_id })
  }

  async create({
    content,
    expires_in,
    user_id,
  }: CreateTokenDTO): Promise<Token | null> {
    console.log(content)

    const newToken = new this.Repository({
      content,
      expires_in,
      user_id,
    })

    await newToken.save()

    return await this.findByUserId(user_id)
  }
}
