import { useRoute } from '@react-navigation/native'

import { Box, HStack, Heading, Icon, Image, Text, VStack } from '@gluestack-ui/themed'
import { Header } from '../components/Header'
import { AlignCenter } from 'lucide-react-native'

type RouteParams = {
  id: string
}

export function Subject() {
  const route = useRoute()

  const { id } = route.params as RouteParams

  return (
    <VStack flex={1} bg="$blue900">
      <Header />

      <VStack p={24}>
        <Heading color="$light100" fontSize={24} fontWeight="bold">
          Banco de dados
        </Heading>

        <Box mt={24}>
          {/* <Image source="../../../server/src/storage/web-development.svg" /> */}
        </Box>

        <Box p={12} bg="$blue700" rounded={8}>
          <VStack>
            <HStack gap={8} alignItems="center">
              <Icon as={AlignCenter} color="$blue300" size={24} />
              <Heading
                color="$blue300"
                letterSpacing={1.2}
                fontSize={18}
                fontWeight="bold"
              >
                Descrição
              </Heading>
            </HStack>
            <Text color="$light100" lineHeight={24} mt={4}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequuntur enim facilis, mollitia quas reprehenderit ea
              molestiae provident? Esse reprehenderit, nulla perferendis,
              voluptates ut nemo vitae fuga numquam magnam, placeat odit!
            </Text>
          </VStack>
        </Box>
      </VStack>
    </VStack>
  )
}
