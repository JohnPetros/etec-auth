import { GluestackUIProvider } from '@gluestack-ui/themed'
import { SignInForm } from './src/components/SignInForm'
import { SignUpForm } from './src/components/SignUpForm'
import { StatusBar } from 'react-native'

export default function App() {
  return (
    <GluestackUIProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SignUpForm />
    </GluestackUIProvider>
  )
}
