import { Router } from 'express'

import { ListCoursesController } from '../controllers/courses/ListCoursesController'
import { checkAuthentication } from '../middlewares/checkAuthentication'

const listCoursesController = new ListCoursesController()

export const coursesRoutes = Router()

coursesRoutes.get('/', checkAuthentication, listCoursesController.handle)
