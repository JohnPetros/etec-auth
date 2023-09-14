import { ForwardedRef, forwardRef, useRef } from 'react'

import { Box, Center, Heading, VStack } from '@gluestack-ui/themed'
import { Input } from './Input'
import { Button } from './Button'

import BottomSheet from '@gorhom/bottom-sheet'

export interface SignInFormRef {
  expand: VoidFunction
  collapse: VoidFunction
}

export function SignInFormComponent(_: any, ref: ForwardedRef<SignInFormRef>) {
  const bottomSheetRef = useRef<BottomSheet>(null)

  function expand() {
    bottomSheetRef.current?.expand()
  }

  function collapse() {
    bottomSheetRef.current?.collapse()
  }

  function handleLogin() {}

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[70, '75%']}
      backgroundStyle={{ backgroundColor: '#' }}
      handleIndicatorStyle={{ backgroundColor: '#' }}
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
          <Heading color="$blue700" fontSize="$2xl" textTransform="uppercase">
            Faça seu Login
          </Heading>

          <VStack gap={12} w="$full">
            <Input type="email" label="E-mail" placeholder="seu@etec.com.br" />
            <Input type="password" label="Senha" placeholder="sua senha" />
          </VStack>

          <Box mt={24} w="$full">
            <Button title="Login" onPress={handleLogin} />
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
