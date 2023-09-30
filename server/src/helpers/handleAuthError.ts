import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'
import { AppError } from '../utils/AppError'

interface AuthErrorProps {
  userId: string
  userAuthAttempts: number
  usersRepository: IUsersRepository
  error: Error
}

export async function handleAuthError({
  userId,
  userAuthAttempts,
  usersRepository,
  error,
}: AuthErrorProps) {
  await usersRepository.incrementAuthAttempts(userAuthAttempts, userId)
  const newError = error
  throw new AppError(newError.message as string, 500)
}
