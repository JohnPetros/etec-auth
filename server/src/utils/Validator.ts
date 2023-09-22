import { ZodError, z } from 'zod'
import { AppError } from './AppError'

export class Validator {
  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g

  private emailSchema = z
    .string({
      required_error: 'Insira uma senha',
    })
    .email('E-mail está no formato incorreto')

  private passwordShema = z
    .string({
      required_error: 'Insira uma senha',
    })
    .refine(
      (password) => this.passwordRegex.test(password),
      'Senha está no formato incorreto'
    )

  private signInUserSchema = z.object({
    email: this.emailSchema,
    password: this.passwordShema,
  })

  private signUpUserSchema = z
    .object({
      name: z
        .string({
          required_error: 'Insira um nome de usuário',
        })

        .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres'),
      email: this.emailSchema,
      password: this.passwordShema,
      password_confirmation: z.string({
        required_error: 'Confirme sua senha',
      }),
    })
    .refine(
      ({ password, password_confirmation }) =>
        password === password_confirmation,
      'Senhas não conferem'
    )

  private execute(validation: () => void) {
    try {
      validation()
    } catch (error) {
      throw new AppError(this.formatError(error as ZodError), 400)
    }
  }

  formatError(error: ZodError) {
    return error.issues.map((error) => error.message)
  }

  validateEmail(email: string) {
    return this.execute(() => this.emailSchema.parse(email))
  }

  validatePassword(password: string) {
    return this.execute(() => this.passwordShema.parse(password))
  }

  validateSignUpUser({
    name,
    email,
    password,
    password_confirmation,
  }: z.infer<typeof this.signUpUserSchema>) {
    return this.execute(() =>
      this.signUpUserSchema.parse({
        name,
        email,
        password,
        password_confirmation,
      })
    )
  }

  validateSignInUser({
    email,
    password,
  }: z.infer<typeof this.signInUserSchema>) {
    return this.execute(() =>
      this.signInUserSchema.parse({
        email,
        password,
      })
    )
  }
}
