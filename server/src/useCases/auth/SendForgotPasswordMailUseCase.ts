import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { IMailService } from '../../services/interfaces/IMailService'

import { Validator } from '../../utils/Validator'
import { AppError } from '../../utils/AppError'
import { TemplateEngine } from '../../utils/TemplateEngine'
import { Jwt } from '../../utils/Jwt'
import { verifiyUserAuthAttempts } from '../../helpers/verifiyUserAuthAttempts'

export class SendForgotPasswordMailUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailService: IMailService
  ) {}

  async execute(email: string): Promise<string> {
    const validator = new Validator()

    validator.validateEmail(email)

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Usuário não encontrado', 401)
    }

    const userAuthAttempts = await verifiyUserAuthAttempts(
      user,
      this.usersRepository
    )

    if (!user.is_verified) {
      await this.usersRepository.incrementAuthAttempts(
        userAuthAttempts,
        user.id
      )
      throw new AppError('Usuário não verificado', 401)
    }

    const jwt = new Jwt()

    const token = jwt.generatePasswordToken(user.id)

    if (!token) {
      await this.usersRepository.incrementAuthAttempts(
        userAuthAttempts,
        user.id
      )
      throw new AppError(
        'Não foi possível criar token de redefinição de senha',
        500
      )
    }

    const baseUrl = process.env.PASSWORD_RESET_URL

    if (!baseUrl) {
      await this.usersRepository.incrementAuthAttempts(
        userAuthAttempts,
        user.id
      )
      throw new AppError('Url para resetar a senha não registrado', 500)
    }

    const mailVariables = {
      name: user.name,
      link: `${baseUrl}/${token}`,
    }

    const templateEngine = new TemplateEngine()

    try {
      const templatePath = templateEngine.getTemplatePath(
        'mails',
        'forgotPasswordMail.hbs'
      )

      await this.mailService.send({
        to: email,
        subject: 'Recuperação de senha',
        path: templatePath,
        variables: mailVariables,
      })
    } catch (error) {
      await this.usersRepository.incrementAuthAttempts(
        userAuthAttempts,
        user.id
      )
      new AppError('Erro ao enviar e-mail para recuperar a senha', 500)
    }

    return `Um e-mail foi enviado para o endereço de e-mail ${email} para recuperar a sua senha`
  }
}
