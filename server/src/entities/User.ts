export interface User {
  id: string
  name: string
  email: string
  password: string
  is_verified: boolean
  auth_attempts: number
  blocked_util: null | Date
}
