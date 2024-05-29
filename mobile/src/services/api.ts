import axios, { AxiosError } from 'axios'

import { API_URL } from '@env'

import { storage } from '../storage'

import type { RefreshTokenResponse } from '../@types/authResponse'

type ApiData = {
  errorMessage: string
}

export const api = axios.create({ baseURL: "http://192.168.1.64:3333" })

export const getApiErrorMessage = (error: unknown): string => {
  console.error(error)

  if (axios.isAxiosError(error) && error.status !== null) {
    return error.response?.data.errorMessage
  }

  return String(error)
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
    console.error(JSON.stringify(error, null, 2))
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
