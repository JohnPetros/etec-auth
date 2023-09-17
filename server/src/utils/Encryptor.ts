import { compare, hash } from 'bcrypt'

export class Encryptor {
  async generateHash(value: string, salt: number = 8) {
    return hash(value, salt)
  }

  async compareHash(value: string, hash: string) {
    return compare(value, hash)
  }
}
