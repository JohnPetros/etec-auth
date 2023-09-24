import { sign, verify } from 'jsonwebtoken'
import { authConfig } from '../configs/authConfig'
import { AppError } from './AppError'

export class Jwt {
  private readonly secretToken = authConfig.secretToken
  private readonly secretEmailToken = authConfig.secretEmailToken
  private readonly secretRefreshToken = authConfig.secretRefreshToken
  public readonly tokenExpiresIn = authConfig.tokenExpiresIn
  public readonly emailTokenExpiresIn = authConfig.emailTokenExpiresIn
  public readonly refreshTokenExpiresIn = authConfig.refreshTokenExpiresIn
  private readonly errors: Record<string, string> = {
    'jwt expired': 'expirado',
    'jwt malformed': 'inválido',
  }

  private handleVerificationError(error: Error, tokenType: string) {
    const errorMessage = this.errors[error.message] ?? 'Token inválido'
    throw new AppError(`${tokenType} ${errorMessage}`, 401)
  }

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
      try {
        const { sub } = verify(token, this.secretToken)
        return String(sub)
      } catch (error) {
        this.handleVerificationError(error as Error, 'Token')
      }
    }
  }

  verifyEmailToken(token: string) {
    if (this.secretEmailToken) {
      try {
        const { sub } = verify(token, this.secretEmailToken)
        return String(sub)
      } catch (error) {
        this.handleVerificationError(error as Error, 'Token de e-mail')
      }
    }
  }

  verifyRefreshToken(refreshToken: string) {
    if (this.secretRefreshToken) {
      try {
        const { sub } = verify(refreshToken, this.secretRefreshToken)
        return String(sub)
      } catch (error) {
        this.handleVerificationError(error as Error, 'Refresh token')
      }
    }
  }
}
