import { Box, Toast as ToastContainer, ToastTitle } from '@gluestack-ui/themed'

interface ToastProps {
  type: 'success' | 'error'
  message: string
}

export function Toast({ type, message }: ToastProps) {
  return (
    <ToastContainer>
      <Box
        rounded={12}
        borderLeftWidth={12}
        borderColor={type === 'success' ? '$green500' : '$red500'}
        bg={'$light100'}
        opacity={1}
        alignItems="center"
        justifyContent="center"
        p={12}
        zIndex={50}
      >
        <ToastTitle color="$gray900" fontSize={16}>
          {message}
        </ToastTitle>
      </Box>
    </ToastContainer>
  )
}
