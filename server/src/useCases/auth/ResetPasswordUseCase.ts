import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

import { AppError } from '../../utils/AppError'
import { Encryptor } from '../../utils/Encryptor'
import { Validator } from '../../utils/Validator'

export class ResetPasswordUseCase {
  constructor(
    private tokensRepository: ITokensRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    resetPasswordTokenContent: string,
    userId: string,
    newPassword: string
  ) {
    if (!resetPasswordTokenContent) {
      throw new AppError('Token de redefinição de senha não fornecido', 400)
    }

    const resetPasswordToken = await this.tokensRepository.findByContent(
      resetPasswordTokenContent
    )

    console.log({ resetPasswordToken })

    if (!resetPasswordToken) {
      throw new AppError(
        'Token de redefinição de senha não fornecido ou expirado',
        400
      )
    }

    if (resetPasswordToken.user_id !== userId) {
      throw new AppError('Usuário inválido', 401)
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('Usuário não encontrado', 400)
    }

    const validator = new Validator()

    validator.validatePassword(newPassword)

    const encryptor = new Encryptor()

    user.password = await encryptor.generateHash(newPassword, 8)

    console.log(user.password)

    await this.usersRepository.update({ password: user.password }, user.id)

    await this.tokensRepository.deleteById(resetPasswordToken.id)

    return 'Senha alterada com sucesso'
  }
}
