import { useAuth } from '../hooks/useAuth'
import { TouchableOpacity } from 'react-native'

import {
  Box,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useTheme,
} from '@gluestack-ui/themed'
import Ionicons from '@expo/vector-icons/Ionicons'

export function Header() {
  const { user } = useAuth()

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
        <Text color="$blue900">{'John Petros'}</Text>
        <TouchableOpacity>
          <Icon as={Ionicons} name="exit-outline" size={24} color="$blue900" />
        </TouchableOpacity>
      </HStack>
    </HStack>
  )
}
