import { Subject } from '../../entities/Subject'

export interface ISubjectsRepository {
  findById(id: string): Promise<Subject | null>
  listAll(course_id: string): Promise<Subject[] | null>
}
