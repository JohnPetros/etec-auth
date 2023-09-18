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
    try {
      await this.Repository.deleteOne({ id })
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao tentar deletar token', 500)
    }
  }

  async findByUserId(user_id: string): Promise<Token | null> {
    try {
      return await this.Repository.findOne<Token>({ user_id })
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao encontrar token', 500)
    }
  }

  async create({
    content,
    expires_in,
    user_id,
  }: CreateTokenDTO): Promise<Token | null> {
    try {
      const newToken = new this.Repository({
        content,
        expires_in,
        user_id,
      })

      await newToken.save()

      return await this.findByUserId(user_id)
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao tentar salvar token', 500)
    }
  }
}
