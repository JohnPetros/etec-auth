import { ICoursesRepository } from './interfaces/ICoursesRepository'
import { CourseModel } from '../models/CourseModel'

import { AppError } from '../utils/AppError'
import { Course } from '../entities/Course'

export class CoursesRepository implements ICoursesRepository {
  private Repository: typeof CourseModel

  constructor() {
    this.Repository = CourseModel
  }

  async findAll(): Promise<Course[]> {
    try {
      return await this.Repository.find<Course>().populate('subjects')
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to find all courses')
    }
  }
}
