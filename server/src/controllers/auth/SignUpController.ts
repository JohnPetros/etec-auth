import { Request, Response } from 'express'
import { UsersRepository } from '../../repositories/UsersRepository'
import { TokensRepository } from '../../repositories/TokensRepository'
import { MailService } from '../../services/MailService'
import { SignUpUserUseCase } from '../../useCases/auth/SignUpUserUseCase'

export class SignUpController {
  async handle(request: Request, response: Response) {
    const { name, email, password, password_confirmation } = request.body

    const usersRepository = new UsersRepository()
    const tokensRepository = new TokensRepository()
    const mailService = new MailService()

    const signUpUserUseCase = new SignUpUserUseCase(
      usersRepository,
      tokensRepository,
      mailService
    )

    const { user, message } = await signUpUserUseCase.execute({
      name,
      email,
      password,
      password_confirmation,
    })

    return response.status(201).json({ user, message })
  }
}
