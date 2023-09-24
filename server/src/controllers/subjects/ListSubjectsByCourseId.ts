import { Request, Response } from 'express'
import { SubjectsRepository } from '../../repositories/SubjectsRepository'

export class ListSubjectsByCourseIdController {
  async handle(request: Request, response: Response) {
    const { course_id } = request.params

    const subjectsRepository = new SubjectsRepository()

    const subjects = await subjectsRepository.listByCourseId(course_id)

    console.log({ subjects })

    return response.json({ subjects })
  }
}
