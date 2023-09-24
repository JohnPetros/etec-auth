import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useToast } from '../hooks/useToast'

import { FlatList } from 'react-native'
import { Box, Text, VStack } from '@gluestack-ui/themed'
import { Header } from '../components/Header'
import { CourseButton } from '../components/CourseButton'
import { SubjectCard } from '../components/SubjectCard'

import type { Course } from '../@types/course'
import type { Subject } from '../@types/subject'

import { api } from '../services/api'

const courseIcons: Record<string, string> = {
  'desenvolvimento de sistemas': 'computer',
  'automação industrial': 'computer',
  administração: 'computer',
}

export function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const toast = useToast()

  function getCourseTitle(courseId: string) {
    return courses.find((course) => course.id === courseId)?.title ?? courseIcons
  }

  function handleCourseButtonPress(courseId: string) {
    setSelectedCourseId(courseId)
  }

  async function fetchCourses() {
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
    }
  }

  async function fetchSubjectsByCourse() {
    try {
      const response = await api.get('subjects?course_id=' + selectedCourseId)
      const subjects = await response.data

      setSubjects(subjects)
    } catch (error) {
      console.error(error)
      toast.show({
        type: 'error',
        message: 'Erro ao listar disciplinas por curso',
      })
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

      <Box mt={24} p={24}>
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubjectCard
              title={item.title}
              icon={
                courseIcons[
                  getCourseTitle(selectedCourseId).toString().toLowerCase()
                ]
              }
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
    </VStack>
  )
}
