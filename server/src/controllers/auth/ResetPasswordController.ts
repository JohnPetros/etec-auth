import { Request, Response } from 'express'

import { UsersRepository } from '../../repositories/UsersRepository'

import { ResetPasswordUseCase } from '../../useCases/auth/ResetPasswordUseCase'

export class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password_token } = request.query
    const { email, new_password, old_password, new_password_confirmation } =
      request.body

    const usersRepository = new UsersRepository()

    const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository)

    const message = await resetPasswordUseCase.execute({
      email,
      oldPassword: old_password,
      newPassword: new_password,
      newPasswordConfirmation: new_password_confirmation,
      resetPasswordToken: String(password_token),
    })

    return response.json({ message })
  }
}
