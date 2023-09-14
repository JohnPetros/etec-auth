import { useRef } from 'react'
import { Box, Center, Heading, VStack } from '@gluestack-ui/themed'
import { Logo } from './Logo'
import { Input } from './Input'
import { Button } from './Button'
import { SignInForm, SignInFormRef } from './SignInForm'

export function SignUpForm() {
  const signInFormRef = useRef<SignInFormRef>(null)

  function handleSignUp() {}

  function handleSignInForm() {
    signInFormRef.current?.expand()
  }

  return (
    <Box bg="$blue900" p={24}>
      <Center h="$full" w="$full">
        <Logo />
        <Heading
          mt={24}
          color="$light100"
          fontSize="$2xl"
          textTransform="uppercase"
        >
          Crie sua Login
        </Heading>

        <VStack gap={12} w="$full">
          <Input type="email" label="Nome" placeholder="seu@etec.com.br" />
          <Input type="email" label="E-mail" placeholder="seu@etec.com.br" />
          <Input type="password" label="Senha" placeholder="sua senha" />
          <Input
            type="password"
            label="Confirmação de senha"
            placeholder="confirme sua senha"
          />
        </VStack>

        <Box mt={32} w="$full">
          <Button title="Criar conta" onPress={handleSignUp} />
        </Box>

        <Box mt={12} w="$full">
          <Button
            title="Fazer login"
            isLink={true}
            onPress={handleSignInForm}
          />
        </Box>
      </Center>

      <SignInForm ref={signInFormRef} />
    </Box>
  )
}
