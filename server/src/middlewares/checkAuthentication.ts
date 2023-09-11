import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../utils/AppError'

export function checkAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing!', 401)
  }

  const secretToken = process.env.SECRET_TOKEN

  if (!secretToken) {
    throw new AppError('Token is missing', 500)
  }

  const token = authHeader.split(' ')[1]

  try {
    const { sub: user_id } = verify(token, secretToken)

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
