import express, { Express } from 'express'
import cors from 'cors'
import { routes } from '../routes'

export function appConfig(app: Express): void {
  app.use(express.json())
  // app.use(cors)
  app.use('/auth', routes)
}