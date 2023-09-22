import { Router } from 'express'

import { SignUpController } from '../controllers/auth/SignUpController'
import { SignInController } from '../controllers/auth/SignInController'
import { RefreshTokenController } from '../controllers/auth/RefreshTokenController'
import { checkAuthentication } from '../middlewares/checkAuthentication'
import { SendForgotPasswordMailController } from '../controllers/auth/SendForgotPasswordMailController'
import { ResetPasswordController } from '../controllers/auth/ResetPasswordController'

export const authRoutes = Router()

const signUpController = new SignUpController()
const signInController = new SignInController()
const refreshTokenController = new RefreshTokenController()
const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordController()

authRoutes.post('/sign_up', signUpController.handle)
authRoutes.post('/sign_in', signInController.handle)
authRoutes.post(
  '/refresh_token',
  checkAuthentication,
  refreshTokenController.handle
)
authRoutes.post(
  '/send_forgot_password_mail',
  checkAuthentication,
  sendForgotPasswordMailController.handle
)
authRoutes.patch(
  '/reset_password/:user_id',
  checkAuthentication,
  resetPasswordController.handle
)
