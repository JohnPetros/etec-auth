import { ReactNode, createContext, useState } from 'react'
import { useToast } from '../hooks/useToast'

import { api, getApiErrorMessage } from '../services/api'

import type { ApiResponse } from '../types/apiResponse'
import type { User } from '../types/user'

export interface SignUpProps {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface SignInProps {
  name: string
  email: string
  password: string
  password_confirmation: string
}

type AuthContextValue = {
  user: User | null
  signUp: ({}: SignUpProps) => void
  signIn: ({}: SignInProps) => void
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
    const errorMessage = getApiErrorMessage(error)

    if (Array.isArray(errorMessage)) {
      errorMessage.forEach((message) => {
        toast.show({ type: 'error', message })
      })
    }

    toast.show({ type: 'error', message: errorMessage })
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
        data: { user },
      } = await api.post<ApiResponse>('auth/sign_up', {
        name,
        email,
        password,
        password_confirmation,
      })

      setUser(user)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function signIn({ email, password }: SignUpProps) {
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await api.post<ApiResponse>('auth/sign_in', {
        email,
        password,
      })

      setUser(user)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
