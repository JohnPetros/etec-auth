import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import { SignUpForm } from './src/components/SignUpForm'
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
  return (
    <GluestackUIProvider>
      <GestureHandlerRootView>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <ToastProvider duration={3000} textStyle={{ fontSize: 20 }}  swipeEnabled={true}>
          <SignUpForm />
        </ToastProvider>

      </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}
