import { Router } from 'express'
import PaymentsControllers from '../controllers/PaymentsController.js'

const router = Router()
router.post('/makePayment', PaymentsControllers.makePayment)
router.post('/paymentStatus', PaymentsControllers.paymentStatus)

export default router
