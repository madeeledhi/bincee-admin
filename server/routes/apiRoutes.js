// libs
import { Router } from 'express'

// src
import app from '../components/app/apiRoutes'

const router = Router()

router.use('/', app)

export default router
