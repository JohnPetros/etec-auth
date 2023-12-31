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
      return await this.Repository.find<Subject>({
        course_id,
      }).populate('course_id')
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao listar disciplinas por curso', 500)
    }
  }

  async findById(id: string): Promise<Subject | null> {
    try {
      return await this.Repository.findOne<Subject>({ _id: id }).populate('course_id')
    } catch (error) {
      console.error(error)
      throw new AppError('Erro ao tentar encontrar dados de disciplina', 500)
    }
  }
}
