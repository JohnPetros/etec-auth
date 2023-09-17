import { sign, verify } from 'jsonwebtoken'

export class Jwt {
  private readonly secretToken = process.env.SECRET_TOKEN

  generateToken(email: string) {
    if (this.secretToken) {
      const token = sign({}, this.secretToken, {
        subject: email,
        expiresIn: '1d',
      })

      return token
    }
  }

  generateRefreshToken(email: string) {}

  verifyToken(token: string) {
    if (this.secretToken) verify(token, this.secretToken)
  }
}
