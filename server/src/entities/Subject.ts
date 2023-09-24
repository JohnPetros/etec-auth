import { Course } from './Course'

export interface Subject {
  id: string
  title: string
  course_id: Pick<Course, 'id'>
}
