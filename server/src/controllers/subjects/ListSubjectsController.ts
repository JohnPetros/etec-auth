import { Request, Response } from 'express'
import { SubjectsRepository } from '../../repositories/SubjectsRepository'

export class ListSubjectsController {
  async handle(request: Request, response: Response) {
    const { course_id } = request.query

    const subjectsRepository = new SubjectsRepository()

    const subjects = await subjectsRepository.listAll(String(course_id))

    return response.json(subjects)
  }
}
