import { Router } from 'express'

import { SignUpController } from '../controllers/auth/SignUpController'
import { SignInController } from '../controllers/auth/SignInController'
import { RefreshTokenController } from '../controllers/auth/RefreshTokenController'
import { checkAuthentication } from '../middlewares/checkAuthentication'

export const authRoutes = Router()

const signUpController = new SignUpController()
const signInController = new SignInController()
const refreshTokenController = new RefreshTokenController()

authRoutes.post('/sign_up', signUpController.handle)
authRoutes.post('/sign_in', signInController.handle)
authRoutes.post('/refresh_token', checkAuthentication, refreshTokenController.handle)
