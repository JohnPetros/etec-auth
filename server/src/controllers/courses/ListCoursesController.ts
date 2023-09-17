import { Request, Response } from 'express'
import { CoursesRepository } from '../../repositories/CoursesRepository'

export class ListCoursesController {
  async handle(request: Request, response: Response) {

    const coursesRepository = new CoursesRepository()

    const courses = await coursesRepository.findAll()

    return response.json(courses)
  }
}
