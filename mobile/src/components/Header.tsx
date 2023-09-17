import { useAuth } from '../hooks/useAuth'
import { TouchableOpacity } from 'react-native'

import { HStack, Heading, Icon, Text } from '@gluestack-ui/themed'
import Ionicons from '@expo/vector-icons/Ionicons'

import { Alert } from 'react-native'

export function Header() {
  const { user, signOut } = useAuth()

  async function handleSignOut() {
    Alert.alert('Alerta', 'Tem certeza que deseja sair?', [
      {
        text: 'Sair',
        onPress: signOut,
      },
      {
        text: 'Cancelar',
        onPress: () => {},
      },
    ])
  }

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      bg="$blue400"
      px={24}
      pt={40}
      h={100}
    >
      <Heading fontSize={32} color="$blue700">
        Etec
      </Heading>

      <HStack gap={8}>
        <Text color="$blue900">{user?.name}</Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Icon as={Ionicons} name="exit-outline" size={24} color="$blue900" />
        </TouchableOpacity>
      </HStack>
    </HStack>
  )
}
