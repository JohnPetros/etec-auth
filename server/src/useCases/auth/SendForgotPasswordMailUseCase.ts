import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { IMailService } from '../../services/interfaces/IMailService'

import { Validator } from '../../utils/Validator'
import { AppError } from '../../utils/AppError'
import { Time } from '../../utils/Time'
import { v4 as uuid } from 'uuid'

export class SendForgotPasswordMailUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository,
    private mailService: IMailService
  ) {}

  async execute(email: string) {
    const validator = new Validator()

    validator.validateEmail(email)

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }

    const token = uuid()

    const time = new Time()

    await this.tokensRepository.create({
      content: token,
      user_id: user.id,
      expires_in: time.addHours(3),
    })

    await this.mailService.send(
      email,
      'Recuperação de senha',
      `O link para o reset é ${token}`
    )
  }
}
