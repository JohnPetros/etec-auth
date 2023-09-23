import { sign, verify } from 'jsonwebtoken'
import { authConfig } from '../configs/authConfig'

export class Jwt {
  private readonly secretToken = authConfig.secretToken
  private readonly secretEmailToken = authConfig.secretEmailToken
  private readonly secretRefreshToken = authConfig.secretRefreshToken
  public readonly tokenExpiresIn = authConfig.tokenExpiresIn
  public readonly emailTokenExpiresIn = authConfig.emailTokenExpiresIn
  public readonly refreshTokenExpiresIn = authConfig.refreshTokenExpiresIn

  generateAuthToken(userId: string) {
    if (this.secretToken) {
      const token = sign({}, this.secretToken, {
        subject: userId,
        expiresIn: this.tokenExpiresIn,
      })

      return token
    }
  }

  generateEmailToken(userId: string) {
    if (this.secretRefreshToken) {
      const refreshToken = sign({}, this.secretRefreshToken, {
        subject: userId,
        expiresIn: `${this.refreshTokenExpiresIn}d`,
      })

      return refreshToken
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

  verifyAuthToken(token: string) {
    if (this.secretToken) {
      const { sub } = verify(token, this.secretToken)
      return String(sub)
    }
  }

  verifyEmailToken(token: string) {
    if (this.secretEmailToken) {
      const { sub } = verify(token, this.secretEmailToken)
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
