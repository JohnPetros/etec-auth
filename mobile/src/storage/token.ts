import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKEN_KEY } from './keys'

export default {
  async saveToken(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token))
  },

  async getToken(): Promise<string | undefined> {
    const token = await AsyncStorage.getItem(TOKEN_KEY)
    if (token) return await JSON.parse(token)
  },

  async destroyToken() {
    await AsyncStorage.removeItem(TOKEN_KEY)
  },
}
