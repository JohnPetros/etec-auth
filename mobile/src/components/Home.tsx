import { useAuth } from "../hooks/useAuth";
import { Box, HStack, Heading, Text, VStack } from "@gluestack-ui/themed";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from "./Button";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

export function Home() {
  const { user } = useAuth()

  return (
    <Box>
      <HStack bg="$blue300" justifyContent="space-between" alignItems="center" py={12} px={24}>
        <Heading fontSize={24} color="$blue700">Etec</Heading>

        <VStack gap={8}>
          <Text color="$light100">{user?.name}</Text>
          <TouchableOpacity>
            <Ionicons name="exit-outline" />
          </TouchableOpacity>
        </VStack>
      </HStack>
    </Box>
  )
}
