import { User } from './user'

export type AuthResponse = {
  user: User
  token: string
  errorMessage: string | string[]
}
