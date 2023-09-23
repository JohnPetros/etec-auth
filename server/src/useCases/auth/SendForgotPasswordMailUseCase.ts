import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'
import { IMailService } from '../../services/interfaces/IMailService'

import { Validator } from '../../utils/Validator'
import { AppError } from '../../utils/AppError'
import { Time } from '../../utils/Time'
import { TemplateEngine } from '../../utils/TemplateEngine'
import { v4 as uuid } from 'uuid'

export class SendForgotPasswordMailUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository,
    private mailService: IMailService
  ) {}

  async execute(email: string): Promise<string> {
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

    const baseUrl = process.env.BASE_URL

    if (!baseUrl) {
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

      await this.mailService.send(
        email,
        'Recuperação de senha',
        templatePath,
        mailVariables
      )
    } catch (error) {
      new AppError('Erro ao enviar e-mail para recuperar a senha', 500)
    }

    return `Um e-mail foi enviado para o endereço de e-mail ${email} para recuperar a sua senha`
  }
}
