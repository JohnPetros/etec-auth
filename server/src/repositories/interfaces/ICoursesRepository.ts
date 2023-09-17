import { Course } from '../../entities/Course'

export interface ICoursesRepository {
  findAll(): Promise<Course[]>
}
