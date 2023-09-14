import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Box, GluestackUIProvider } from '@gluestack-ui/themed'

import { SignInForm } from './src/components/SignInForm'
import { SignUpForm } from './src/components/SignUpForm'

export default function App() {
  return (
    <GluestackUIProvider>
      <GestureHandlerRootView>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <SignUpForm />

      </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}
