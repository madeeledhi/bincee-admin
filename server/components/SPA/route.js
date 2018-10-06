// libs
import { Router } from 'express'

// src
import renderResponse from './spa'

const router = Router()
router.get('*', (req, res) => renderResponse(req, res))

export default router
