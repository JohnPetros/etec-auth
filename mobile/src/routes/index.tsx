import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

import { NavigationContainer } from '@react-navigation/native'

import { Box, Center, Text } from '@gluestack-ui/themed'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
import { storage } from '../storage'
import { createURL } from 'expo-linking'

export function Routes() {
  const { user, isUserDataLoading, loadUserData } = useAuth()

  async function destroy() {
    await storage.destroyUser()
    await storage.destroyAllTokens()
  }

  const url = createURL('etec-auth')

  const linking = {
    prefixes: [url],
    config: {
      screens: {
        forgotPassword: {
          path: 'password-reset/:passwordToken',
        },
      },
    },
  }

  useEffect(() => {
    // destroy()
    loadUserData()
  }, [])

  return (
    <Box flex={1} bg="blue900">
      {isUserDataLoading ? (
        <Center flex={1} bg="blue900">
          <Text color="$light100" fontWeight="$bold" fontSize="$lg">
            ...Carregando
          </Text>
        </Center>
      ) : (
        <NavigationContainer linking={linking}>
          {user?.is_verified ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      )}
    </Box>
  )
}
