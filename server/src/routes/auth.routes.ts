import { Router } from 'express'

import { SignUpController } from '../controllers/auth/SignUpController'
import { SignInController } from '../controllers/auth/SignInController'
import { RefreshTokenController } from '../controllers/auth/RefreshTokenController'
import { ConfirmUserEmailController } from '../controllers/auth/ConfirmUserEmailController'
import { SendForgotPasswordMailController } from '../controllers/auth/SendForgotPasswordMailController'
import { ResetPasswordController } from '../controllers/auth/ResetPasswordController'
import { SignOutController } from '../controllers/auth/SignOutUserController'

import { checkAuthentication } from '../middlewares/checkAuthentication'

export const authRoutes = Router()

const signUpController = new SignUpController()
const signInController = new SignInController()
const signOutController = new SignOutController()
const refreshTokenController = new RefreshTokenController()
const confirmUserEmailController = new ConfirmUserEmailController()
const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordController()

authRoutes.post('/sign_up', signUpController.handle)
authRoutes.post('/sign_in', signInController.handle)
authRoutes.post(
  '/sign_out/:user_id',
  checkAuthentication,
  signOutController.handle
)
authRoutes.post('/refresh_token', refreshTokenController.handle)
authRoutes.post('/confirm_email', confirmUserEmailController.handle)
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
