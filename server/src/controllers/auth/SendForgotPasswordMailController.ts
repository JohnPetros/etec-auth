import { Request, Response } from 'express'
import { SendForgotPasswordMailUseCase } from '../../useCases/auth/SendForgotPasswordMailUseCase'
import { MailService } from '../../services/MailService'
import { UsersRepository } from '../../repositories/UsersRepository'

export class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const usersRepository = new UsersRepository()
    const mailService = new MailService()

    const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      mailService
    )

    const message = await sendForgotPasswordMailUseCase.execute(email)

    return response.json({ message })
  }
}
