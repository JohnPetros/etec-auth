import { ReactNode, createContext, useState } from 'react'
import { Toast } from '../components/Toast'
import { useToast } from '@gluestack-ui/themed'

interface ToastProps {
  type: 'success' | 'error'
  message: string
}

type ToastContextValue = {
  show: ({}: ToastProps) => void
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastContext = createContext({} as ToastContextValue)

export function ToastProvider({ children }: ToastProviderProps) {
  const toast = useToast()

  async function show({ type, message }: ToastProps) {
    toast.show({
      placement: 'top',
      render: () => <Toast type={type} message={message} />,
    })
  }

  return (
    <ToastContext.Provider value={{ show }}>{children}</ToastContext.Provider>
  )
}
