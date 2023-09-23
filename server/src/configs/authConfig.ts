export const authConfig = {
  secretToken: process.env.SECRET_TOKEN,
  secretEmailToken: process.env.EMAIL_SECRET_TOKEN,
  secretRefreshToken: process.env.REFRESH_SECRET_TOKEN,
  tokenExpiresIn: '1d',
  emailTokenExpiresIn: '1h',
  refreshTokenExpiresIn: 30,
}
