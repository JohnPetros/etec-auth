import { Box, Center, Heading, VStack } from '@gluestack-ui/themed'
import { Input } from './Input'
import { Button } from './Button'

export function SignInForm() {
  return (
    <Box bg="$blue300" borderTopStartRadius={48} p={24}>
      <Center h="$full" w="$full">
        <Heading color="$blue700" fontSize="$2xl" textTransform="uppercase">
          Faça seu Login
        </Heading>

        <VStack gap={12} w="$full">
          <Input type="email" label="E-mail" placeholder="seu@etec.com.br" />
          <Input type="password" label="Senha" placeholder="sua senha" />
        </VStack>

        <Box mt={24} w="$full">
          <Button title="Login" />
        </Box>

        <Box mt={16} w="$full">
          <Button title="Criar conta" isLink={true} />
        </Box>
      </Center>
    </Box>
  )
}
