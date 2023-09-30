import { User } from '../entities/User'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'

import { AppError } from '../utils/AppError'
import { Time } from '../utils/Time'

export async function verifiyUserAuthAttempts(
  user: User,
  usersRepository: IUsersRepository
) {
  const time = new Time()

  if (user.blocked_util && time.currentDate() < user.blocked_util) {
    throw new AppError('Usuário bloqueado, tente novamente mais tarde', 401)
  } else if (user.blocked_util && time.currentDate() > user.blocked_util) {
    await usersRepository.unBlockUser(user.id)
    await usersRepository.resetAuthAttempts(user.id)
    return 0
  }

  if (user.auth_attempts >= 5) {
    await usersRepository.blockUser(user.id, time.addHours(1))
    throw new AppError(
      'Máximo de tentativas de autenticação excedido, tente novamente mais tarde',
      401
    )
  }

  return user.auth_attempts
}
