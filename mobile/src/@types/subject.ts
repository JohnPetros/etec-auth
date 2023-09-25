import type { Course } from "./course"

export type Subject = {
  id: string
  title: string
  image: string
  description: string
  course: Pick<Course, 'title'>
}
