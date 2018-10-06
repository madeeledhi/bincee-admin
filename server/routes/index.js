// libs
import { Router } from 'express'

// src
import apiRoutes from './apiRoutes'
import spaRoutes from '../components/SPA/route'

const router = Router()

router.use('/api', apiRoutes)

// Keep this at the end
router.use(spaRoutes)

export default router
