import {
  Button as ButtonContainer,
  ButtonSpinner,
  ButtonText,
} from '@gluestack-ui/themed'

interface ButtonProps {
  title: string
  isLink?: boolean
  onPress: VoidFunction
  isLoading?: boolean
}

export function Button({
  title,
  isLink = false,
  onPress,
  isLoading = false,
}: ButtonProps) {
  return (
    <ButtonContainer
      borderWidth={isLink ? 0 : 2}
      borderBlockColor={isLink ? '' : ''}
      bg={isLink ? '' : '$blue700'}
      rounded="$md"
      p={8}
      h="auto"
      sx={{
        ':active': {
          bg: isLink ? 'none' : '$blue600',
          opacity: 0.8,
        },
      }}
      onPress={onPress}
    >
      {isLoading ? <ButtonSpinner /> : <ButtonText>{title}</ButtonText>}
    </ButtonContainer>
  )
}
