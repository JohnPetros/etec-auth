import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import { AuthProvider } from './src/contexts/AuthContext'
import { ToastProvider } from './src/contexts/ToastContext'
import { Pages } from './src/components/Pages'

export default function App() {
  return (
    <GluestackUIProvider>
      <GestureHandlerRootView>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <ToastProvider>
          <AuthProvider>
            <Pages />
          </AuthProvider>
        </ToastProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}
