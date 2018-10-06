// libs
import { Router } from 'express'

// src
import mainController from './controller'
import mainValidator from './validator'

const router = Router()

router.post('/fetch-data', mainValidator, mainController)

export default router
