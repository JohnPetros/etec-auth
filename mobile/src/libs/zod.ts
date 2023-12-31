import { z } from 'zod'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{6,}$/g

const emailSchema = z
  .string({
    required_error: 'Insira um e-mail',
  })
  .email('E-mail está no formato incorreto')

const passwordSchema = z
  .string({
    required_error: 'Insira uma senha',
  })
  .regex(
    passwordRegex,
    'Senha deve ter pelo menos 6 caracteres, sendo 1 caractere especial, 1 minúscula e 1 maiúscula e 1 número'
  )

const passwordConfirmationSchema = z.string({
  required_error: 'Confirme sua senha',
})

export const signUpFormSchema = z
  .object({
    name: z
      .string({
        required_error: 'Insira um nome de usuário',
      })
      .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres'),
    email: emailSchema,
    password: passwordSchema,
    password_confirmation: passwordConfirmationSchema,
  })
  .refine(
    ({ password, password_confirmation }) => password === password_confirmation,
    'Senhas não conferem'
  )

export const forgotPasswordEmailFormSchema = z.object({
  email: emailSchema,
})

export const resetPasswordFormSchema = z
  .object({
    old_password: passwordSchema,
    new_password: passwordSchema,
    new_password_confirmation: passwordConfirmationSchema,
  })
  .refine(
    ({ new_password, new_password_confirmation }) =>
      new_password === new_password_confirmation,
    'Senhas não conferem'
  )

export const signInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type SignUpFormData = z.infer<typeof signUpFormSchema>
export type SignInFormData = z.infer<typeof signInFormSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>
export type ForgotPasswordEmailFormData = z.infer<
  typeof forgotPasswordEmailFormSchema
>
