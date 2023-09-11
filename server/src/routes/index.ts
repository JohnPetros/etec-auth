import { Router } from 'express'

import { SignUpController } from '../controllers/SignUpController'
import { SignInController } from '../controllers/SignInController'

export const routes = Router()

const signUpController = new SignUpController()
const signInController = new SignInController()

routes.post('/sign_up', signUpController.handle)
routes.post('/sign_in', signInController.handle)
