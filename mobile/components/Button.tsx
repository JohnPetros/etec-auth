import { Button as ButtonUI, ButtonText } from '@gluestack-ui/themed'

interface ButtonProps {
  title: string
}

export function Button({ title }: ButtonProps) {
  return (
    <ButtonUI borderBlockColor="$blue500" bg="$blue700" rounded="$md">
      <ButtonText>{title}</ButtonText>
    </ButtonUI>
  )
}
