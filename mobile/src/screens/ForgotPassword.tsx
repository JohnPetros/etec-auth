import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { emailSchema } from '../libs/zod'

import { Box, Center, Heading, Text } from '@gluestack-ui/themed'
import { Input } from '../components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function ForgotPassword({}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(emailSchema),
  })

  const { isLoading } = useAuth()

  function handleSendForgotPasswordMail() {}

  return (
    <Box flex={1} bg="$blue900" p={24}>
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
            title="Criar conta"
            onPress={handleSubmit(handleSendForgotPasswordMail)}
            isLoading={isLoading}
          />
        </Box>
      </Center>
    </Box>
  )
}
