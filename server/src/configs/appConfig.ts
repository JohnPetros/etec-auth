import express, { Express } from 'express'
import { PUBLIC_FOLDER } from './staticConfig'
import { router } from '../routes'
import { handleError } from '../middlewares/handleError'
import cors from 'cors'

export function appConfig(app: Express): void {
  app.use(express.json())

  app.use(
    cors({
      origin: '*',
    })
  )

  app.use('/statics', express.static(PUBLIC_FOLDER))

  app.use(router)

  app.use(handleError)
}
