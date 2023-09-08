import { Router } from 'express'

import { AuthController } from '../controllers/AuthController'

export const routes = Router()

const authController = new AuthController()

routes.post('/sign_up', authController.signUp)
