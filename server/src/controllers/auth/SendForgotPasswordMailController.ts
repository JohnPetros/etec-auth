import { Request, Response } from 'express'
import { SendForgotPasswordMailUseCase } from '../../useCases/auth/SendForgotPasswordMailUseCase'
import { MailService } from '../../services/MailService'
import { UsersRepository } from '../../repositories/UsersRepository'
import { TokensRepository } from '../../repositories/TokensRepository'

export class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const usersRepository = new UsersRepository()
    const tokensRepository = new TokensRepository()
    const mailService = new MailService()

    const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      tokensRepository,
      mailService
    )

    const message = await sendForgotPasswordMailUseCase.execute(email)

    return response.json({ message })
  }
}
