import { StatusBar } from 'expo-status-bar'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { SignInForm } from './src/components/SignInForm'

export default function App() {
  return (
    <GluestackUIProvider>
      <StatusBar style="auto" />
      <SignInForm />
    </GluestackUIProvider>
  )
}
