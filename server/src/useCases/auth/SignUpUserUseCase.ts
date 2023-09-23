import { ITokensRepository } from '../../repositories/interfaces/ITokensRepository'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

import { IMailService } from '../../services/interfaces/IMailService'

import { Time } from '../../utils/Time'
import { Validator } from '../../utils/Validator'
import { AppError } from '../../utils/AppError'
import { TemplateEngine } from '../../utils/TemplateEngine'
import { Encryptor } from '../../utils/Encryptor'
import { v4 as uuid } from 'uuid'

interface Request {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export class SignUpUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokensRepository: ITokensRepository,
    private mailService: IMailService
  ) {}

  async execute({ name, email, password, password_confirmation }: Request) {
    const validator = new Validator()

    validator.validateSignUpUser({
      name,
      email,
      password,
      password_confirmation,
    })

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('E-mail já em uso', 409)
    }

    const encryptor = new Encryptor()

    const passwordHash = await encryptor.generateHash(password)

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    if (!createdUser) {
      throw new AppError('error ao salvar dados de usuário', 500)
    }

    const token = uuid()

    const time = new Time()

    await this.tokensRepository.create({
      content: token,
      user_id: createdUser?.id,
      expires_in: time.addHours(3),
    })

    const baseUrl = process.env.BASE_URL

    if (!baseUrl) {
      throw new AppError('Url para resetar a senha não registrado', 500)
    }

    const mailVariables = {
      name: name,
      link: `${baseUrl}/${token}`,
    }

    const templateEngine = new TemplateEngine()

    const templatePath = templateEngine.getTemplatePath(
      'mails',
      'emailConfirmationMail'
    )

    await this.mailService.send(
      email,
      'Confirmação de e-mail',
      templatePath,
      mailVariables
    )

    return {
      user: createdUser,
      message: `Um e-mail foi enviado para o endereço de e-mail ${email} para confirmar seu cadastro`,
    }
  }
}
