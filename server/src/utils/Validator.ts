import { ZodError, z } from 'zod'
import { AppError } from './AppError'

export class Validator {
  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g

  private signUpUserSchema = z
    .object({
      name: z.string().min(3),
      email: z.string().email('E-mail está no formato incorreto'),
      password: z
        .string()
        .refine(
          (password) => this.passwordRegex.test(password),
          'Senha está no formato incorreto'
        ),
      password_confirmation: z.string(),
    })
    .refine(
      ({ password, password_confirmation }) =>
        password === password_confirmation,
      'Senhas não conferem'
    )

  execute(validation: () => void) {
    try {
      validation()
    } catch (error) {
      throw new AppError(this.formatError(error as ZodError), 400)
    }
  }

  formatError(error: ZodError) {
    return error.issues.map((error) => error.message)
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
}
