import { Router } from 'express'

import { FindSubjectByIdController } from '../controllers/subjects/FindSubjectByIdController'
import { checkAuthentication } from '../middlewares/checkAuthentication'

const findSubjectByIdController = new FindSubjectByIdController()

export const subjectsRoutes = Router()

subjectsRoutes.get('/:subject_id', checkAuthentication, findSubjectByIdController.handle)
