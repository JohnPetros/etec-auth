import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import {
  ForgotPasswordEmailFormData,
  ResetPasswordFormData,
  forgotPasswordEmailFormSchema,
  resetPasswordFormSchema,
} from '../libs/zod'

import {
  Box,
  Center,
  Heading,
  Icon,
  Pressable,
  VStack,
} from '@gluestack-ui/themed'
import { Input } from '../components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/Button'
import { ArrowLeft } from 'lucide-react-native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

type RouteParams = {
  passwordToken: string
}

export function ForgotPassword() {
  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    reset: emailReset,
    formState: { errors: emailErrors },
  } = useForm<ForgotPasswordEmailFormData>({
    resolver: zodResolver(forgotPasswordEmailFormSchema),
  })

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordFields,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  const { sendForgotPasswordMail, resetPassword, isLoading } = useAuth()

  const [passwordToken, setPasswordToken] = useState('')

  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const route = useRoute()
  const params = route.params as RouteParams
  const email = useRef('')

  async function handleSendForgotPasswordMail({
    email,
  }: ForgotPasswordEmailFormData) {
    await sendForgotPasswordMail(email)
  }

  async function handleResetPassword({
    old_password,
    new_password,
    new_password_confirmation,
  }: ResetPasswordFormData) {
    const isSuccess = await resetPassword({
      email: email.current,
      old_password,
      new_password,
      new_password_confirmation,
      passwordToken,
    })

    if (isSuccess) resetPasswordFields()
  }

  function handleBackToAuthScreen() {
    navigation.navigate('auth')
  }

  function handlePasswordToken(token: string) {
    emailReset()
    setPasswordToken(token)
  }

  useEffect(() => {
    if (params?.passwordToken) {
      handlePasswordToken(params.passwordToken)
    }
  }, [params])

  return (
    <Box flex={1} bg="$blue900" p={24}>
      <Pressable mt={40}>
        <Icon
          as={ArrowLeft}
          color="$light100"
          size={32}
          onPress={handleBackToAuthScreen}
        />
      </Pressable>
      <Center flex={1} w="$full">
        <Heading color="$light100">
          {!passwordToken
            ? 'Insira seu e-mail para recuperar sua senha'
            : 'Insira e confirme sua nova senha'}
        </Heading>
        <VStack gap={12} w="$full" mt={24}>
          {!passwordToken ? (
            <Controller
              control={emailControl}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="email"
                  label="E-mail"
                  placeholder="seu e-mail"
                  value={value}
                  errorMessage={emailErrors.email?.message}
                  onChange={onChange}
                />
              )}
            />
          ) : (
            <>
              <Controller
                control={passwordControl}
                name="old_password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="password"
                    label="Antiga Senha"
                    placeholder="sua senha antiga"
                    value={value}
                    errorMessage={passwordErrors.old_password?.message}
                    onChange={onChange}
                  />
                )}
              />

              <Controller
                control={passwordControl}
                name="new_password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="password"
                    label="Nova Senha"
                    placeholder="sua senha nova"
                    value={value}
                    errorMessage={passwordErrors.new_password?.message}
                    onChange={onChange}
                  />
                )}
              />

              <Controller
                control={passwordControl}
                name="new_password_confirmation"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="password"
                    label="Confirmação da nova senha"
                    placeholder="confirme sua senha nova"
                    value={value}
                    errorMessage={
                      passwordErrors.new_password_confirmation?.message
                    }
                    onChange={onChange}
                  />
                )}
              />
            </>
          )}
        </VStack>

        <Box mt={24} w="$full">
          {!passwordToken ? (
            <Button
              title="Redefinir senha"
              onPress={handleEmailSubmit(handleSendForgotPasswordMail)}
              isLoading={isLoading}
            />
          ) : (
            <Button
              title="Redefinir senha"
              onPress={handlePasswordSubmit(handleResetPassword)}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Center>
    </Box>
  )
}
