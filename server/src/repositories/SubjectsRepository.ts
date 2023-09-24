import { ISubjectsRepository } from './interfaces/ISubjectsRepository'
import { SubjectModel } from '../models/SubjectModel'

import { AppError } from '../utils/AppError'
import { Subject } from '../entities/Subject'

export class SubjectsRepository implements ISubjectsRepository {
  private Repository: typeof SubjectModel

  constructor() {
    this.Repository = SubjectModel
  }

  async listAll(course_id: string): Promise<Subject[] | null> {
    try {
      const subjects = await this.Repository.find<Subject>({ course_id })
      console.log(subjects)

      return subjects
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao listar disciplinas por curso', 500)
    }
  }

  async findById(id: string): Promise<Subject | null> {
    try {
      return await this.Repository.findOne<Subject>({ id })
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao tentar encontrar dados de disciplina', 500)
    }
  }
}
