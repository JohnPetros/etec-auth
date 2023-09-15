import { User } from './user'

export type ApiResponse = {
  user: User
  errorMessage: string | string[]
}
