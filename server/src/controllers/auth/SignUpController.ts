import { Request, Response } from 'express'
import { UsersRepository } from '../../repositories/UsersRepository'
import { RegisterUserUseCase } from '../../useCases/auth/RegisterUserUseCase'

export class SignUpController {
  async handle(request: Request, response: Response) {
    const { name, email, password, password_confirmation } = request.body

    const usersRepository = new UsersRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)

    const createdUser = await registerUserUseCase.execute({
      name,
      email,
      password,
      password_confirmation,
    })

    return response.json({ user: createdUser })
  }
}
