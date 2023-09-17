import { Router } from 'express'

import { authRoutes } from './auth.routes'
import { coursesRoutes } from './courses.routes'
import { subjectsRoutes } from './subjects.routes'

export const router = Router()

router.use('/auth', authRoutes)
router.use('/courses', coursesRoutes)
router.use('/subjects', subjectsRoutes)
