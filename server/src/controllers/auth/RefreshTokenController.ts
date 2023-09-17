// export class RefreshTokenController {
//   async handle(request: Request, response: Response) {
//     const { email, password } = request.body

//     const usersRepository = new UsersRepository()
//     const tokensRepository = new TokensRepository()

//     const authenticateUserUseCase = new AuthenticateUserUseCase(
//       usersRepository,
//       tokensRepository
//     )

//     const { user, token } = await authenticateUserUseCase.execute({
//       email,
//       password,
//     })

//     return response.json({ user, token })
//   }
// }
