import { useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormData, signInFormSchema } from '../libs/zod'

import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Box, Center, Heading, VStack } from '@gluestack-ui/themed'
import { Logo } from './Logo'
import { Input } from './Input'
import { Button } from './Button'
import { SignInForm, SignInFormRef } from './SignInForm'

export function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  const { signUp, isLoading } = useAuth()

  const signInFormRef = useRef<SignInFormRef>(null)

  async function handleSignUp({
    name,
    email,
    password,
    password_confirmation,
  }: SignUpFormData) {
    signUp({ name, email, password, password_confirmation })
  }

  function handleSignInForm() {
    signInFormRef.current?.expand()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box bg="$blue900" p={24}>
        <Center h="$full" w="$full">
          <Logo />
          <Heading
            mt={24}
            color="$light100"
            fontSize="$2xl"
            fontFamily="$heading"
            textTransform="uppercase"
          >
            Crie sua Login
          </Heading>

          <VStack gap={12} w="$full">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  label="Nome"
                  placeholder="Nome de usuário"
                  value={value}
                  errorMessage={errors.name?.message}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="email"
                  label="E-mail"
                  placeholder="seu@etec.com.br"
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  label="Senha"
                  placeholder="sua senha"
                  value={value}
                  errorMessage={errors.password?.message}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirmation"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  label="Confirmação de senha"
                  placeholder="confirme sua senha"
                  value={value}
                  errorMessage={errors.password_confirmation?.message}
                  onChange={onChange}
                />
              )}
            />
          </VStack>

          <Box mt={32} w="$full">
            <Button
              title="Criar conta"
              onPress={handleSubmit(handleSignUp)}
              isLoading={isLoading}
            />
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
    </TouchableWithoutFeedback>
  )
}
