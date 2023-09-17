import { Router } from 'express'

import { SignUpController } from '../controllers/auth/SignUpController'
import { SignInController } from '../controllers/auth/SignInController'

export const authRoutes = Router()

const signUpController = new SignUpController()
const signInController = new SignInController()

authRoutes.post('/sign_up', signUpController.handle)
authRoutes.post('/sign_in', signInController.handle)
authRoutes.post('/refresh_token', signInController.handle)
