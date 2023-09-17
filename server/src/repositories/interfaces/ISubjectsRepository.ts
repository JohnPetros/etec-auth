import { Subject } from '../../entities/Subject'

export interface ISubjectsRepository {
  findById(id: string): Promise<Subject | null>
}
