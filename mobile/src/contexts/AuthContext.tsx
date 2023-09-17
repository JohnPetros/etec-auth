import { ReactNode, createContext, useState } from 'react'
import { useToast } from '../hooks/useToast'

import {
  addAuthorizationHeader,
  api,
  getApiErrorMessage,
} from '../services/api'

import type { AuthResponse } from '../types/authResponse'
import type { User } from '../types/user'
import { storage } from '../storage'

export interface SignUpProps {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface SignInProps {
  email: string
  password: string
}

type AuthContextValue = {
  user: User | null
  signUp: ({}: SignUpProps) => void
  signIn: ({}: SignInProps) => void
  signOut: () => void
  loadUserData: () => void
  isLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  function handleError(error: unknown) {
    console.error(error)

    const errorMessage = getApiErrorMessage(error)
    const errorFallback = 'Erro interno no sistema'

    if (Array.isArray(errorMessage)) {
      errorMessage.forEach((message) => {
        toast.show({
          type: 'error',
          message: errorMessage ?? errorFallback,
        })
      })
    }

    toast.show({ type: 'error', message: errorMessage ?? errorFallback })
  }

  async function destroyUserData() {
    try {
      await Promise.all([storage.destroyUser(), storage.destroyToken()])
      setUser(null)
    } catch (error) {
      console.error(error)
      toast.show({
        type: 'error',
        message: 'Error ao remover informações de usuário',
      })
    }
  }

  async function saveUserData(user: User, token: string) {
    try {
      await Promise.all([storage.saveUser(user), storage.saveToken(token)])
      setUser(user)
      addAuthorizationHeader(token)
    } catch (error) {
      console.error(error)
      toast.show({
        type: 'error',
        message: 'Error ao salvar informações de usuário',
      })
    }
  }

  async function loadUserData() {
    const user = await storage.getUser()
    const token = await storage.getToken()

    console.log(user)

    if (user && token) {
      saveUserData(user, token)
    }
  }

  async function signUp({
    name,
    email,
    password,
    password_confirmation,
  }: SignUpProps) {
    setIsLoading(true)

    try {
      const {
        data: { user, token },
      } = await api.post<AuthResponse>('auth/sign_up', {
        name,
        email,
        password,
        password_confirmation,
      })

      if (user && token) await saveUserData(user, token)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function signIn({ email, password }: SignInProps) {
    setIsLoading(true)

    try {
      const {
        data: { user, token },
      } = await api.post<AuthResponse>('auth/sign_in', {
        email,
        password,
      })

      if (user && token) await saveUserData(user, token)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    setIsLoading(true)

    try {
      // await api.post<AuthResponse>('auth/sign_out')
      await destroyUserData()
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut, loadUserData, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
