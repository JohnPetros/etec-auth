import { Request, Response } from 'express'
import { CreateUserUseCase } from '../useCases/CreateUserUseCase'
import { UsersRepository } from '../repositories/UsersRepository'

export class SignUpController {
  async handle(request: Request, response: Response) {
    const { name, email, password, password_confirmation } = request.body

    const usersRepository = new UsersRepository()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
      password_confirmation,
    })

    return response.json({ user: createdUser })
  }
}
