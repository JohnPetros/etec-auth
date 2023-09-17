import { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/AppError'
import { Jwt } from '../utils/Jwt'

export function checkAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing!', 401)
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    throw new AppError('Token missing!', 401)
  }

  const jwt = new Jwt()

  try {
    jwt.verifyToken(token)

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
