import { Router } from 'express'

import { FindSubjectByIdController } from '../controllers/subjects/FindSubjectByIdController'
import { checkAuthentication } from '../middlewares/checkAuthentication'
import { ListSubjectsController } from '../controllers/subjects/ListSubjectsController'

const findSubjectByIdController = new FindSubjectByIdController()
const listSubjectsController = new ListSubjectsController()

export const subjectsRoutes = Router()

subjectsRoutes.get(
  '/:subject_id',
  checkAuthentication,
  findSubjectByIdController.handle
)
subjectsRoutes.get(
  '/',
  checkAuthentication,
  listSubjectsController.handle
)
