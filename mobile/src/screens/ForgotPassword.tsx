import { Box, Center, Text } from '@gluestack-ui/themed'
import { Input } from '../components/Input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function ForgotPassword({}) {
  const {register} = useForm()
  const [email, setEmail] = useState('')


  function handleEmailChange(value: string) {

  }

  return (
    <Box flex={1} bg="$blue900" p={24}>
      <Center>
        <Input
          type="email"
          label="E-mail"
          placeholder="seu e-mail"
          value={email}
          errorMessage={''}
          onChange={handleEmailChange}
          {...register('email')}
        />
      </Center>
    </Box>
  )
}
