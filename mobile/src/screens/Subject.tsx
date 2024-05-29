import { useCallback, useState } from 'react'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

import {
  Box,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Pressable,
  Center,
} from '@gluestack-ui/themed'
import { Header } from '../components/Header'
import { ChevronLeft, AlignCenter } from 'lucide-react-native'
import { Subject as SubjectData } from '../@types/subject'
import { api } from '../services/api'
import { Loading } from '../components/Loading'
import { SvgUri } from 'react-native-svg'
import { COURSE_ICONS } from '../utils/course-icons'

type RouteParams = {
  id: string
}

export function Subject() {
  const route = useRoute()
  const [subject, setSubject] = useState<SubjectData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  const { id } = route.params as RouteParams

  async function fetchSubjectData() {
    setIsLoading(true)

    try {
      const response = await api.get('subjects/' + id)
      const subject = await response.data

      setSubject(subject)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (id) fetchSubjectData()
    }, [id])
  )

  return (
    <VStack flex={1} bg="$blue900">
      <Header />

      {!subject || isLoading ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <VStack pt={12} px={24}>
          <HStack alignItems="center" justifyContent="space-between">
            <Pressable ml={-12} onPress={navigation.goBack}>
              <Icon as={ChevronLeft} color="$blue300" size={32} />
            </Pressable>

            <HStack gap={8} alignItems="center">
              <Icon
                as={COURSE_ICONS[subject.course.title.toLowerCase()]}
                color="$blue300"
                size={24}
              />
              <Text color="$blue300" fontSize={16} fontWeight="bold">
                {subject.course.title}
              </Text>
            </HStack>
          </HStack>

          <Heading color="$light100" mt={36} fontSize={24} fontWeight="bold">
            {subject.title}
          </Heading>

          <Center mt={24} height={220} rounded="$md" overflow="hidden">
            <SvgUri
              uri={`${api.defaults.baseURL}/statics/images/${subject.image}`}
              style={{ width: 280, height: 280 }}
            />
          </Center>

          <Box p={12} mt={24} bg="$blue700" rounded={8}>
            <VStack>
              <HStack gap={8} alignItems="center">
                <Icon as={AlignCenter} color="$blue300" size={24} />
                <Heading
                  color="$blue300"
                  letterSpacing={1.2}
                  fontSize={18}
                  fontWeight="bold"
                >
                  Descrição
                </Heading>
              </HStack>
              <Text color="$light100" lineHeight={24} mt={4}>
                {subject.description}
              </Text>
            </VStack>
          </Box>
        </VStack>
      )}
    </VStack>
  )
}
