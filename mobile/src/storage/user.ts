import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_EMAIL_KEY, USER_KEY } from './keys'
import type { User } from '../@types/user'

export default {
  async saveUser(user: User) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  async saveUserEmail(email: string) {
    await AsyncStorage.setItem(USER_EMAIL_KEY, email)
  },

  async getUserEmail(): Promise<string | undefined> {
    const email = await AsyncStorage.getItem(USER_EMAIL_KEY)
    if (email) return email
  },

  async getUser(): Promise<User | undefined> {
    const user = await AsyncStorage.getItem(USER_KEY)
    if (user) return JSON.parse(user)
  },

  async destroyUser() {
    await AsyncStorage.removeItem(USER_KEY)
  },

  async destroyUserEmail() {
    await AsyncStorage.removeItem(USER_EMAIL_KEY)
  },
}
