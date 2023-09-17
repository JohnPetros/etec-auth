import { sign, verify } from 'jsonwebtoken'

export class Jwt {
  private readonly secretToken = process.env.SECRET_TOKEN
  private readonly secretRefreshToken = process.env.REFRESH_SECRET_TOKEN
  public tokenExpiresIn = '1d'
  public refreshTokenExpiresIn = 30

  generateToken(email: string) {
    if (this.secretToken) {
      const token = sign({}, this.secretToken, {
        subject: email,
        expiresIn: this.tokenExpiresIn,
      })

      return token
    }
  }

  async generateRefreshToken(userId: string) {
    if (this.secretRefreshToken) {
      const refreshToken = sign({}, this.secretRefreshToken, {
        subject: userId,
        expiresIn: this.refreshTokenExpiresIn,
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
}
