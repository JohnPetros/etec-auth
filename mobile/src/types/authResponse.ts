import { User } from './user'

export type SignUpResponse = {
  user: User
  emailToken: string
  message: string
  errorMessage: string | string[]
}

export type SignInResponse = {
  user: User
  token: string
  errorMessage: string | string[]
}

export type ConfirmEmailResponse = {
  user: User
  token: string
  refreshToken: string
  errorMessage: string | string[]
}
