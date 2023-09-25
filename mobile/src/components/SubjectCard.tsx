import { Box, Button, HStack, Icon, Text } from '@gluestack-ui/themed'
import { Computer, ChevronRight } from 'lucide-react-native'

interface SubjectCardProps {
  title: string
  icon: string
  onPress: VoidFunction
}

export function SubjectCard({ title, icon, onPress }: SubjectCardProps) {
  return (
    <Button
      bg="$blue700"
      rounded={8}
      mb={12}
      h="auto"
      w="$full"
      sx={{
        ':active': {
          opacity: 0.7,
        },
      }}
      onPress={onPress}
    >
      <HStack w="$full" alignItems="center" p={12} gap={12}>
        <Box
          bg="$blue400"
          rounded={8}
          p={8}
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={Computer} name={icon} color="$blue900" size={40} />
        </Box>
        <Text color="$light100">{title}</Text>
      </HStack>
      <Icon as={ChevronRight} color="$blue900" size={40} />
    </Button>
  )
}
