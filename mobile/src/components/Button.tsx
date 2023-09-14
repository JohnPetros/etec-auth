import { Button as ButtonContainer, ButtonText } from '@gluestack-ui/themed'

interface ButtonProps {
  title: string
  isLink?: boolean
  onPress: VoidFunction
}

export function Button({ title, isLink = false, onPress }: ButtonProps) {
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
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  )
}
