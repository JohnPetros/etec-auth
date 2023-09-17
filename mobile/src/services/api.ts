import { API_URL } from '@env'
import axios from 'axios'

export const api = axios.create({ baseURL: API_URL })

export const getApiErrorMessage = (error: unknown): string => {
  return axios.isAxiosError(error) ? error.response?.data.errorMessage : error
}

export const addAuthorizationHeader = (token: string) => {
  if (token) api.defaults.headers['authorization'] = `Bearer ${token}`
}
