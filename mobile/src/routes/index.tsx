import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

import { NavigationContainer } from '@react-navigation/native'

import { Box } from '@gluestack-ui/themed'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { user, loadUserData } = useAuth()

  useEffect(() => {
    console.log({ user })

    loadUserData()
  }, [])

  return (
    <Box flex={1} bg="blue.900">
      <NavigationContainer>
        {/* <AppRoutes /> */}
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
