import { handleAuthError } from '../../helpers/handleAuthError'
import { verifiyUserAuthAttempts } from '../../helpers/verifiyUserAuthAttempts'
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

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não encontrado', 401)
    }

    const userAuthAttempts = await verifiyUserAuthAttempts(
      user,
      this.usersRepository
    )

    const jwt = new Jwt()

    let passwordUserId

    try {
      passwordUserId = jwt.verifyPasswordToken(resetPasswordToken)
    } catch (error) {
      handleAuthError({
        userId: user.id,
        userAuthAttempts,
        usersRepository: this.usersRepository,
        error: error as Error,
      })
    }

    if (passwordUserId !== user.id) {
      await this.usersRepository.incrementAuthAttempts(
        user.auth_attempts,
        user.id
      )
      throw new AppError('Usuário não encontrado', 401)
    }

    const validator = new Validator()

    try {
      validator.validatePassword(oldPassword)
    } catch (error) {
      handleAuthError({
        userId: user.id,
        userAuthAttempts,
        usersRepository: this.usersRepository,
        error: error as Error,
      })
    }

    if (newPasswordConfirmation !== newPassword) {
      await this.usersRepository.incrementAuthAttempts(
        user.auth_attempts,
        user.id
      )
      throw new AppError('Senhas não conferem', 401)
    }

    const encryptor = new Encryptor()

    const passwordMatch = encryptor.compareHash(oldPassword, user.password)

    if (!passwordMatch) {
      await this.usersRepository.incrementAuthAttempts(
        user.auth_attempts,
        user.id
      )
      throw new AppError('Usuário não encontrado', 401)
    }

    user.password = await encryptor.generateHash(newPassword, 8)

    await this.usersRepository.update({ password: user.password }, user.id)

    return 'Senha alterada com sucesso'
  }
}
