import { useAuth } from "../hooks/useAuth"

import { Home } from "./Home"
import { SignUpForm } from "./SignUpForm"

export function Pages() {
  const { user } = useAuth()
  
  return user ? <Home /> : <SignUpForm />
}
