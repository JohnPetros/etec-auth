import { ISubjectsRepository } from './interfaces/ISubjectsRepository'
import { SubjectModel } from '../models/SubjectModel'

import { AppError } from '../utils/AppError'
import { Subject } from '../entities/Subject'

export class SubjectsRepository implements ISubjectsRepository {
  private Repository: typeof SubjectModel

  constructor() {
    this.Repository = SubjectModel
  }

  async findById(id: string): Promise<Subject | null> {
    try {
      return await this.Repository.findOne<Subject>({ id })
    } catch (error) {
      console.error(error)
      throw new AppError('Failed to find all subjects')
    }
  }
}
