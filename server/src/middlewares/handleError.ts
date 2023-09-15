import { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/AppError'

export function handleError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  console.error(error.message)

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      errorMessage: error.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  })
}
