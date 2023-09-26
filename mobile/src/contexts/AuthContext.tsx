import { ReactNode, createContext, useState } from 'react'
import { useToast } from '../hooks/useToast'

import {
  setAuthorizationHeader,
  api,
  getApiErrorMessage,
} from '../services/api'

import { storage } from '../storage'

import type {
  ConfirmEmailResponse,
  SendForgotPasswordMail,
  SignInResponse,
  SignUpResponse,
} from '../@types/authResponse'
import type { User } from '../@types/user'

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

interface ConfirmEmailProps {
  email: string
  emailToken: string
}

type AuthContextValue = {
  user: User | null
  signUp: ({}: SignUpProps) => Promise<void>
  signIn: ({}: SignInProps) => Promise<void>
  signOut: () => Promise<void>
  confirmEmail: ({ email, emailToken }: ConfirmEmailProps) => Promise<boolean>
  loadUserData: () => void
  sendForgotPasswordMail: (email: string) => Promise<void>
  isLoading: boolean
  isUserDataLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUserDataLoading, setIsUserDataLoading] = useState(true)
  const toast = useToast()

  function handleError(error: unknown) {
    const errorMessage = getApiErrorMessage(error)
    const errorFallback = 'Erro interno no sistema'

    if (Array.isArray(errorMessage)) {
      errorMessage.forEach((message) => {
        toast.show({
          type: 'error',
          message: message ?? errorFallback,
        })
      })
    }

    toast.show({ type: 'error', message: errorMessage ?? errorFallback })
  }

  async function destroyUserData() {
    try {
      await Promise.all([storage.destroyUser(), storage.destroyAllTokens()])
      setUser(null)
    } catch (error) {
      console.error(error)
      toast.show({
        type: 'error',
        message: 'Error ao remover informações de usuário',
      })
    }
  }

  async function saveUser(user: User) {
    console.log({ user })

    try {
      await storage.saveUser(user)
      setUser(user)
    } catch (error) {
      console.error(error)
      toast.show({
        type: 'error',
        message: 'Error ao salvar informações de usuário',
      })
    }
  }

  async function loadUserData() {
    setIsUserDataLoading(true)

    try {
      const user = await storage.getUser()
      const token = await storage.getToken()

      if (user && token) {
        await Promise.all([saveUser(user), storage.saveToken(token)])

        setAuthorizationHeader(token)
      }
    } catch (error) {
    } finally {
      setIsUserDataLoading(false)
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
        data: { user, emailToken, message },
      } = await api.post<SignUpResponse>('auth/sign_up', {
        name,
        email,
        password,
        password_confirmation,
      })

      if (user && emailToken) await saveUser(user)

      toast.show({ type: 'success', message })
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
        data: { user, token, refreshToken },
      } = await api.post<SignInResponse>('auth/sign_in', {
        email,
        password,
      })

      if (user.is_verified && token) {
        await Promise.all([
          storage.saveToken(token),
          storage.saveRefreshToken(refreshToken),
          saveUser(user),
        ])
        setAuthorizationHeader(token)
      }
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    setIsLoading(true)

    if (!user) return

    try {
      await api.post(`auth/sign_out/${user.id}`)
      await destroyUserData()
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function confirmEmail({ email, emailToken }: ConfirmEmailProps) {
    setIsLoading(true)

    try {
      setAuthorizationHeader(emailToken)

      const {
        data: { user, token, refreshToken },
      } = await api.post<ConfirmEmailResponse>('auth/confirm_email', {
        email,
      })

      if (user && token) {
        await Promise.all([
          saveUser(user),
          storage.saveToken(token),
          storage.saveRefreshToken(refreshToken),
        ])

        setAuthorizationHeader(token)
      }
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }

    return false
  }

  async function sendForgotPasswordMail(email: string) {
    setIsLoading(true)

    try {
      const {
        data: { message },
      } = await api.post<SendForgotPasswordMail>(
        'auth/send_forgot_password_mail',
        {
          email,
        }
      )

      toast.show({ type: 'success', message })
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        confirmEmail,
        sendForgotPasswordMail,
        loadUserData,
        isLoading,
        isUserDataLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
