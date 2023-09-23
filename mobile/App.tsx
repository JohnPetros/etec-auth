import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import { AuthProvider } from './src/contexts/AuthContext'
import { ToastProvider } from './src/contexts/ToastContext'
import { Routes } from './src/routes'

export default function App() {
  
  return (
    <GluestackUIProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#1e3a8a' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <ToastProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ToastProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  )
}
