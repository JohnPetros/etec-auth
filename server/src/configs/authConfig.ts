export const authConfig = {
  secretToken: process.env.SECRET_TOKEN,
  secretEmailToken: process.env.EMAIL_SECRET_TOKEN,
  secretPasswordToken: process.env.PASSWORD_SECRET_TOKEN,
  secretRefreshToken: process.env.REFRESH_SECRET_TOKEN,
  tokenExpiresIn: '30m',
  emailTokenExpiresIn: '5m',
  passwordTokenExpiresIn: '5m',
  refreshTokenExpiresIn: 7,
}
