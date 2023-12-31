import { NextFunction, Request, Response } from 'express'

import { AppError } from '../utils/AppError'
import { Jwt } from '../utils/Jwt'

import { UsersRepository } from '../repositories/UsersRepository'

import { verifiyUserAuthAttempts } from '../helpers/verifiyUserAuthAttempts'

export async function checkAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token de autenticação não encontrado', 401)
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    throw new AppError('Token de autenticação não encontrado', 401)
  }

  const jwt = new Jwt()

  const userId = jwt.verifyAuthToken(token)

  if (!userId) {
    throw new AppError('Usuário não encontrado', 401)
  }

  const usersRepository = new UsersRepository()

  const user = await usersRepository.findById(userId)

  if (!user) {
    throw new AppError('Usuário não encontrado', 401)
  }

  const userAuthAttempts = await verifiyUserAuthAttempts(user, usersRepository)

  if (!user.is_verified) {
    await usersRepository.incrementAuthAttempts(userAuthAttempts, user.id)
    throw new AppError('Usuário não verificado', 401)
  }

  next()
}
