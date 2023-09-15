import { API_URL } from '@env'
import axios from 'axios'

export const api = axios.create({ baseURL: API_URL })

export const getApiErrorMessage = (error: unknown): string => {
  return axios.isAxiosError(error) ? error.response?.data.errorMessage : null
}
