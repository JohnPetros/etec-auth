import AsyncStorage from '@react-native-async-storage/async-storage'
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from './keys'

export default {
  async saveToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token))
  },

  async saveRefreshToken(refresh_token: string) {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(refresh_token))
  },

  async getRefreshToken(): Promise<string | undefined> {
    const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)
    if (refresh_token) return await JSON.parse(refresh_token)
  },

  async getToken(): Promise<string | undefined> {
    const token = await AsyncStorage.getItem(TOKEN_KEY)
    if (token) return await JSON.parse(token)
  },

  async destroyAllTokens() {
    await Promise.all([
      AsyncStorage.removeItem(TOKEN_KEY),
      AsyncStorage.removeItem(REFRESH_TOKEN_KEY),
    ])
  },

  async destroyRefreshToken() {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}
