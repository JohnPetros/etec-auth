import { Router } from 'express'

import { SignUpController } from '../controllers/SignUpController'

export const routes = Router()

const signUpController = new SignUpController()

routes.post('/sign_up', signUpController.handle)
