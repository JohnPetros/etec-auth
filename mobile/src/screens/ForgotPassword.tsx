import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { forgotPasswordEmailSchema } from '../libs/zod'
import { createURL } from 'expo-linking'

import {
  Box,
  Center,
  Heading,
  Icon,
  Pressable,
} from '@gluestack-ui/themed'
import { Input } from '../components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/Button'
import { ArrowLeft } from 'lucide-react-native'
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

type RouteParams = {
  passwordToken: string
}

type FormData = {
  email: string
}

export function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordEmailSchema),
  })

  const { sendForgotPasswordMail, isLoading } = useAuth()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const route = useRoute()
  const params = route.params as RouteParams

  const passwordResetUrl = createURL('password-reset')

  async function handleSendForgotPasswordMail({ email }: FormData) {
    await sendForgotPasswordMail(email)
  }

  function handleBackToAuthScreen() {
    navigation.navigate('auth')
  }

  function handlePasswordToken(token: string) {

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
          Insira seu e-mail para recuperar sua senha
        </Heading>
        <Box w="$full" mt={24}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                type="email"
                label="E-mail"
                placeholder="seu e-mail"
                value={value}
                errorMessage={errors.email?.message}
                onChange={onChange}
              />
            )}
          />
        </Box>

        <Box mt={24} w="$full">
          <Button
            title="Enviar e-mail"
            onPress={handleSubmit(handleSendForgotPasswordMail)}
            isLoading={isLoading}
          />
        </Box>
      </Center>
    </Box>
  )
}
