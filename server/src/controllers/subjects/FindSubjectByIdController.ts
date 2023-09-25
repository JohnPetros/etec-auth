import { Request, Response } from 'express'
import { SubjectsRepository } from '../../repositories/SubjectsRepository'

export class FindSubjectByIdController {
  async handle(request: Request, response: Response) {
    const { subject_id } = request.params



    const subjectsRepository = new SubjectsRepository()

    const subject = await subjectsRepository.findById(subject_id)
    console.log(subject)

    return response.json(subject)
  }
}
