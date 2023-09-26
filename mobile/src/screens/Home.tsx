import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { useToast } from '../hooks/useToast'

import { FlatList } from 'react-native'
import { Box, Center, Text, VStack } from '@gluestack-ui/themed'
import { Header } from '../components/Header'
import { CourseButton } from '../components/CourseButton'
import { SubjectCard } from '../components/SubjectCard'

import type { Course } from '../@types/course'
import type { Subject } from '../@types/subject'

import { api } from '../services/api'
import { AppNavigatorRoutesProps } from '../routes/app.routes'
import { Loading } from '../components/Loading'
import { COURSE_ICONS } from '../utils/course-icons'

const courseIcons: Record<string, string> = {
  'desenvolvimento de sistemas': 'computer',
  'automação industrial': 'computer',
  administração: 'computer',
}

export function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleCourseButtonPress(courseId: string) {
    setSelectedCourseId(courseId)
  }

  function handleSubjectCardPress(subjectId: string) {
    navigation.navigate('subject', { id: subjectId })
  }

  async function fetchCourses() {
    setIsLoading(true)

    try {
      const response = await api.get('courses')
      const courses = await response.data
      setCourses(courses)
      setSelectedCourseId(courses[0].id)
    } catch (error) {
      console.error(error)
      toast.show({
        type: 'error',
        message: 'Erro ao listar cursos',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchSubjectsByCourse() {
    setIsLoading(true)

    try {
      const response = await api.get('subjects?course_id=' + selectedCourseId)
      const subjects = await response.data

      console.log(subjects)

      setSubjects(subjects)
    } catch (error) {
      console.error(error)
      toast.show({
        type: 'error',
        message: 'Erro ao listar disciplinas por curso',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (selectedCourseId) fetchSubjectsByCourse()
    }, [selectedCourseId])
  )

  return (
    <VStack h="$full" bg="$blue900">
      <Header />

      <Box mt={24} pl={24}>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseButton
              title={item.title}
              isActive={item.id === selectedCourseId}
              onPress={() => handleCourseButtonPress(item.id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Box>

      {isLoading ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <Box mt={24} p={24}>
          <FlatList
            data={subjects}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SubjectCard
                title={item.title}
                icon={COURSE_ICONS[item.course.title.toLowerCase()]}
                onPress={() => handleSubjectCardPress(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text color="$green100" textAlign="center" fontSize="$lg">
                Nenhuma disciplina encontrada.
              </Text>
            }
          />
        </Box>
      )}
    </VStack>
  )
}
