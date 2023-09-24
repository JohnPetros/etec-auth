import { Router } from 'express'

import { FindSubjectByIdController } from '../controllers/subjects/FindSubjectByIdController'
import { checkAuthentication } from '../middlewares/checkAuthentication'
import { ListSubjectsByCourseIdController } from '../controllers/subjects/ListSubjectsByCourseId'

const findSubjectByIdController = new FindSubjectByIdController()
const listSubjectsByCourseIdController = new ListSubjectsByCourseIdController()

export const subjectsRoutes = Router()

subjectsRoutes.get(
  '/:subject_id',
  checkAuthentication,
  findSubjectByIdController.handle
)
subjectsRoutes.get(
  '/by_course/:course_id',
  checkAuthentication,
  listSubjectsByCourseIdController.handle
)
