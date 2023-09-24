import { Button, ButtonText } from '@gluestack-ui/themed'

interface CourseButtonProps {
  title: string
  isActive: boolean
  onPress: VoidFunction
}

export function CourseButton({ title, isActive, onPress }: CourseButtonProps) {
  return (
    <Button
      bg={isActive ? '$blue400' : '$blue600'}
      p={8}
      rounded="$md"
      borderWidth={2}
      borderColor={isActive ? '$blue600' : '$blue900'}
      mr={8}
      sx={{
        ':active': {
          opacity: 0.7,
        },
      }}
      onPress={onPress}
    >
      <ButtonText
        fontWeight="$normal"
        color={isActive ? '$blue900' : '$light100'}
      >
        {title}
      </ButtonText>
    </Button>
  )
}
