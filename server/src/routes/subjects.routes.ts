import { Router } from 'express'

import { FindSubjectByIdController } from '../controllers/subjects/FindSubjectByIdController'

const findSubjectByIdController = new FindSubjectByIdController()

export const subjectsRoutes = Router()

subjectsRoutes.get('/:subject_id', findSubjectByIdController.handle)
