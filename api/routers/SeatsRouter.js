import { Router } from 'express'
import SeatsController from '../controllers/SeatsController.js'

const router = Router()
router.get('/getSeatsInfo', SeatsController.getSeatsInfo)

export default router
