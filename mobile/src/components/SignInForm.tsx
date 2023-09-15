import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInFormData, SignUpFormData, signInFormSchema } from '../libs/zod'

import { Box, Center, Heading, VStack } from '@gluestack-ui/themed'
import { Input } from './Input'
import { Button } from './Button'
import BottomSheet from '@gorhom/bottom-sheet'
import { Keyboard } from 'react-native'
import { useAuth } from '../hooks/useAuth'

export interface SignInFormRef {
  expand: VoidFunction
  collapse: VoidFunction
  close: VoidFunction
}

export function SignInFormComponent(_: any, ref: ForwardedRef<SignInFormRef>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  const { signIn, isLoading } = useAuth()

  const bottomSheetRef = useRef<BottomSheet>(null)

  function expand() {
    bottomSheetRef.current?.expand()
  }

  function collapse() {
    bottomSheetRef.current?.collapse()
  }

  function close() {
    bottomSheetRef.current?.close()
  }

  function handleSignIn({ email, password }: SignInFormData) {
    signIn({ email, password })
  }

  useImperativeHandle(ref, () => {
    return {
      expand,
      collapse,
      close,
    }
  })

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[40, '100%']}
      backgroundStyle={{ backgroundColor: '#' }}
      handleIndicatorStyle={{ backgroundColor: '#' }}
      enablePanDownToClose={false}
      enableOverDrag={false}
      enableHandlePanningGesture={false}
    >
      <Box
        bg="$blue300"
        borderTopLeftRadius={48}
        borderTopRightRadius={48}
        p={24}
        h="$full"
        w="$full"
        flex={1}
      >
        <Center h="$full" w="$full">
          <Heading
            color="$blue700"
            fontSize="$2xl"
            fontFamily="$heading"
            textTransform="uppercase"
          >
            Faça seu Login
          </Heading>

          <VStack gap={12} w="$full">
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
                  label="Confirmação de senha"
                  placeholder="confirme sua senha"
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </VStack>

          <Box mt={24} w="$full">
            <Button
              title="Fazer login"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Box>

          <Box mt={16} w="$full">
            <Button title="Criar conta" isLink={true} onPress={collapse} />
          </Box>
        </Center>
      </Box>
    </BottomSheet>
  )
}

export const SignInForm = forwardRef(SignInFormComponent)
