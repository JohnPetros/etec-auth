import axios, { AxiosError } from 'axios'

import { API_URL } from '@env'

import { storage } from '../storage'

import type { RefreshTokenResponse } from '../@types/authResponse'

type ApiData = {
  errorMessage: string
}

export const api = axios.create({ baseURL: API_URL })

export const getApiErrorMessage = (error: unknown): string => {
  return axios.isAxiosError(error) ? error.response?.data.errorMessage : error
}

export const setAuthorizationHeader = (token: string) => {
  if (token) api.defaults.headers['authorization'] = `Bearer ${token}`
}

type FailRequest = {
  onSuccess: (newToken: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshingToken = false
let failRequestsQueue: FailRequest[] = []

async function refreshToken() {
  try {
    const currentRefreshToken = await storage.getRefreshToken()

    const {
      data: { token, refreshToken },
    } = await api.post<RefreshTokenResponse>('auth/refresh_token', {
      refresh_token: currentRefreshToken,
    })

    await Promise.all([
      storage.saveToken(token),
      storage.saveRefreshToken(refreshToken),
    ])

    setAuthorizationHeader(token)

    failRequestsQueue.forEach((request) => request.onSuccess(token))
    failRequestsQueue = []
  } catch (error) {
    failRequestsQueue.forEach((request) =>
      request.onFailure(error as AxiosError)
    )
    failRequestsQueue = []
  } finally {
    isRefreshingToken = false
  }
}

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    const { errorMessage } = error.response?.data as ApiData
    const originalErrorConfig = error.config

    async function executeRefreshToken() {
      await refreshToken()
    }

    if (errorMessage === 'Token expirado') {
      if (!isRefreshingToken) executeRefreshToken()

      return new Promise((resolve, reject) => {
        failRequestsQueue.push({
          onSuccess: (newToken: string) => {
            if (originalErrorConfig) {
              originalErrorConfig.headers[
                'Authorization'
              ] = `Bearer ${newToken}`

              resolve(api(originalErrorConfig))
            }
          },
          onFailure: (error: AxiosError) => {
            reject(error)
          },
        })
      })
    }

    async function destroyUserData() {
      await Promise.all([storage.destroyAllTokens(), storage.destroyUser()])
    }

    destroyUserData()

    return Promise.reject(error)
  }
)
