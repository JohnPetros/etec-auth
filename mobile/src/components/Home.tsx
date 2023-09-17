import { useState } from 'react'

import { FlatList } from 'react-native'
import { Box, VStack } from '@gluestack-ui/themed'
import { Header } from './Header'
import { CourseButton } from './CourseButton'
import { SubjectCard } from './SubjectCard'

import type { Course } from '../types/course'
import type { Subject } from '../types/subject'

export function Home() {
  const [cousers, setCourses] = useState<Course[]>([
    {
      id: '123',
      title: 'desenvolvimento de sistemas',
      icon: '',
    },
    {
      id: '456',
      title: 'automação industrial',
      icon: '',
    },
    {
      id: '987',
      title: 'administração',
      icon: '',
    },
  ])

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '123',
      title: 'desenvolvimento de sistemas',
      image: '',
      description: '',
    },
    {
      id: '456',
      title: 'automação industrial',
      image: '',
      description: '',
    },
    {
      id: '987',
      title: 'administração',
      image: '',
      description: '',
    },
  ])

  const [activeCourseId, setActiveCourseId] = useState('123')

  const icon = 'computer'

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
        />
      </Box>
    </VStack>
  )
}
