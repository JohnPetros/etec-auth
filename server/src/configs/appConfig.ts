import express, { Express } from 'express'
import cors from 'cors'
import { router } from '../routes'
import { handleError } from '../middlewares/handleError'

export function appConfig(app: Express): void {
  app.use(express.json())

  app.use(
    cors({
      origin: '*',
    })
  )
  app.use(router)

  app.use(handleError)
}
