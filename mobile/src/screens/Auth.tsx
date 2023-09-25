import { useRef, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormData, signUpFormSchema } from '../libs/zod'
import { createURL } from 'expo-linking'
import { Linking } from 'react-native'

import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Box, Center, Heading, VStack } from '@gluestack-ui/themed'
import { Logo } from '../components/Logo'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { SignInForm, SignInFormRef } from '../components/SignInForm'

import { useToast } from '../hooks/useToast'
import { AppNavigatorRoutesProps } from '../routes/app.routes'

import type { AuthNavigatorRoutesProps } from '../routes/auth.routes'

export function Auth() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  const { user, signUp, confirmEmail, isLoading } = useAuth()

  const signInFormRef = useRef<SignInFormRef>(null)

  const emailConfirmationUrl = createURL('email-confirmation')

  async function handleSignUp({
    name,
    email,
    password,
    password_confirmation,
  }: SignUpFormData) {
    signUp({ name, email, password, password_confirmation })
  }
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>()
  const appNavigation = useNavigation<AppNavigatorRoutesProps>()

  const toast = useToast()

  function handleSignInForm() {
    signInFormRef.current?.expand()
  }

  function handleForgotPasswordButton() {
    authNavigation.navigate('forgotPassword')
  }

  async function handleDeepLink({ url }: { url: string }) {
    console.log(!url || !url.includes(emailConfirmationUrl))

    if (!url || !url.includes(emailConfirmationUrl)) {
      toast.show({ type: 'error', message: 'Erro ao confirmar e-mail' })
      return
    }

    const token = url.split('/').at(-1)

    if (!token) {
      toast.show({ type: 'error', message: 'Token inválido' })
      return
    }

    if (user) {
      setTimeout(async () => {
        const isConfirmed = await confirmEmail({
          email: user?.email,
          emailToken: token,
        })

        if (isConfirmed) {
          appNavigation.navigate('home')
        } else {
          toast.show({ type: 'error', message: 'Erro ao confirmar e-mail' })
        }
      }, 1000)
    }
  }

  useEffect(() => {
    Linking.addEventListener('url', handleDeepLink)
  }, [])

  return (
    <Box flex={1} bg="$blue900" p={24}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Center h="$full">
          <Logo />
          <Heading
            mt={24}
            color="$light100"
            fontSize="$2xl"
            fontFamily="$heading"
            textTransform="uppercase"
          >
            Crie sua conta
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

          <Box mt={6} w="$full">
            <Button
              title="Recuperar senha"
              isLink={true}
              onPress={handleForgotPasswordButton}
            />
          </Box>
        </Center>
      </TouchableWithoutFeedback>
      <SignInForm ref={signInFormRef} />
    </Box>
  )
}
