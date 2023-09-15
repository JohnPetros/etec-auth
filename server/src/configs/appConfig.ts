import express, { Express } from 'express'
import cors from 'cors'
import { routes } from '../routes'
import { handleError } from '../middlewares/handleError'

export function appConfig(app: Express): void {
  app.use(express.json())

  app.use(
    cors({
      origin: '*',
    })
  )
  app.use('/auth', routes)

  app.use(handleError)
}
