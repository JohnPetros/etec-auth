import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

import { Home } from './Home'
import { SignUpForm } from './SignUpForm'

export function Pages() {
  const { user, loadUserData } = useAuth()

  useEffect(() => {
    console.log(user);

    loadUserData()
  }, [])

  return user ? <Home /> : <SignUpForm />
}
