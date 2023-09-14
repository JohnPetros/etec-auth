import { Box, Heading } from '@gluestack-ui/themed'

export function Logo() {
  return (
    <Box
      bg="$blue300"
      w={80}
      h={80}
      rounded="$lg"
      alignItems="center"
      justifyContent="center"
      elevation={2}
    >
      <Heading color="$blue700" fontSize="$3xl">
        Etec
      </Heading>
    </Box>
  )
}
