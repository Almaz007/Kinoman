import { Router } from 'express'
import ScreeningsController from '../controllers/ScreeningsController.js'

const router = Router()
router.get('/getPosterMoviesByDate', ScreeningsController.getPosterMoviesByDate)
router.get('/getDatesForMovie', ScreeningsController.getDatesForMovie)
router.get('/getScreeningsForDate', ScreeningsController.getScreeningsForDate)

export default router
