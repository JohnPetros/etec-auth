import { sign, verify } from 'jsonwebtoken'

export class Jwt {
  private readonly secretToken = process.env.SECRET_TOKEN
  private readonly secretRefreshToken = process.env.REFRESH_SECRET_TOKEN
  public tokenExpiresIn = '1d'
  public refreshTokenExpiresIn = 30

  generateToken(userId: string) {
    if (this.secretToken) {
      const token = sign({}, this.secretToken, {
        subject: userId,
        expiresIn: this.tokenExpiresIn,
      })

      return token
    }
  }

  generateRefreshToken(userId: string) {
    if (this.secretRefreshToken) {
      const refreshToken = sign({}, this.secretRefreshToken, {
        subject: userId,
        expiresIn: `${this.refreshTokenExpiresIn}d`,
      })

      return refreshToken
    }
  }

  verifyToken(token: string) {
    if (this.secretToken) {
      const { sub } = verify(token, this.secretToken)
      return String(sub)
    }
  }

  verifyRefreshToken(refreshToken: string) {
    if (this.secretRefreshToken) {
      const { sub } = verify(refreshToken, this.secretRefreshToken)
      return String(sub)
    }
  }
}
