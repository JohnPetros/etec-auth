import { ReactNode, createContext, useState } from 'react'
import { useToast } from '../hooks/useToast'

import { api, getApiErrorMessage } from '../services/api'

import type { ApiResponse } from '../types/apiResponse'
import type { User } from '../types/user'

interface SignUpProps {
  name: string
  email: string
  password: string
  password_confirmation: string
}

type AuthContextValue = {
  user: User | null
  signUp: ({}: SignUpProps) => void
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

  async function signUp({
    name,
    email,
    password,
    password_confirmation,
  }: SignUpProps) {
    setIsLoading(true)

    try {
      const { data } = await api.post<ApiResponse>('auth/sign_up', {
        name,
        email,
        password,
        password_confirmation,
      })

      setUser(data.user)
    } catch (error) {
      const errorMessage = getApiErrorMessage(error)

      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((message) => {
          toast.show({ type: 'error', message })
        })
      }

      toast.show({ type: 'error', message: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signUp, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
