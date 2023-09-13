import { Button as ButtonContainer, ButtonText } from '@gluestack-ui/themed'

interface ButtonProps {
  title: string
  isLink?: boolean
}

export function Button({ title, isLink = false }: ButtonProps) {
  return (
    <ButtonContainer
      borderWidth={isLink ? 0 : 2}
      borderBlockColor={isLink ? '' : ''}
      bg={isLink ? '$blue300' : 'none'}
      rounded="$md"
      sx={{
        ':active': {
          bg: isLink ? 'none' : '$blue600',
          opacity: 0.8,
        },
      }}
    >
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  )
}
