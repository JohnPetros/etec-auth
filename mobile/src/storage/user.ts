import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_KEY } from './keys'
import type { User } from '../types/user'

export default {
  async saveUser(user: User) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  async getUser(): Promise<string | undefined> {
    const user = await AsyncStorage.getItem(USER_KEY)
    if (user) return await JSON.parse(user)
  },
}
