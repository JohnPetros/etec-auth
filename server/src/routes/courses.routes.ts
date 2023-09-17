import { Router } from 'express'

import { ListCoursesController } from '../controllers/courses/ListCoursesController'

const listCoursesController = new ListCoursesController()

export const coursesRoutes = Router()

coursesRoutes.get('/', listCoursesController.handle)
