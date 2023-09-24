import { useEffect, useState } from 'react'
import { useToast } from '../hooks/useToast'

import { FlatList } from 'react-native'
import { Box, Text, VStack } from '@gluestack-ui/themed'
import { Header } from '../components/Header'
import { CourseButton } from '../components/CourseButton'
import { SubjectCard } from '../components/SubjectCard'

import type { Course } from '../@types/course'
import type { Subject } from '../@types/subject'
import { api } from '../services/api'

export function Home() {
  const [cousers, setCourses] = useState<Course[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [activeCourseId, setActiveCourseId] = useState('123')
  const toast = useToast()

  const icon = 'computer'

  async function fetchCourses() {
    try {
      const response = await api.get('courses')
      const courses = await response.data
      setCourses(courses)
      setActiveCourseId(courses[0].id)
    } catch (error) {
      console.error(error)

    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <VStack h="$full" bg="$blue900">
      <Header />

      <Box mt={24} pl={24}>
        <FlatList
          data={cousers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseButton
              title={item.title}
              isActive={item.id === activeCourseId}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Box>

      <Box mt={24} p={24}>
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubjectCard title={item.title} icon={'computer'} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text color="$green100" textAlign="center" fontSize="$lg">
              Nenhuma disciplina encontrada.
            </Text>
          }
        />
      </Box>
    </VStack>
  )
}
