import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

import { AppError } from '../../utils/AppError'
import { Encryptor } from '../../utils/Encryptor'
import { Jwt } from '../../utils/Jwt'
import { Validator } from '../../utils/Validator'

type Request = {
  email: string
  resetPasswordToken: string
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export class ResetPasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    resetPasswordToken,
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  }: Request) {
    if (!resetPasswordToken) {
      throw new AppError('Token de redefinição de senha não fornecido', 400)
    }

    console.log(email)

    const jwt = new Jwt()

    const passwordUserId = jwt.verifyPasswordToken(resetPasswordToken)

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não encontrado', 401)
    }

    if (passwordUserId !== user.id) {
      throw new AppError('Usuário não encontrado', 401)
    }

    const validator = new Validator()

    validator.validatePassword(oldPassword)

    if (newPasswordConfirmation !== newPassword) {
      throw new AppError('Senhas não conferem', 401)
    }

    const encryptor = new Encryptor()

    const passwordMatch = encryptor.compareHash(oldPassword, user.password)

    if (!passwordMatch) {
      throw new AppError('Usuário não encontrado', 401)
    }

    user.password = await encryptor.generateHash(newPassword, 8)

    await this.usersRepository.update({ password: user.password }, user.id)

    return 'Senha alterada com sucesso'
  }
}
