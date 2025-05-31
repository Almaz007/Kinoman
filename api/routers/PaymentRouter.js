import { Router } from 'express';
import PaymentsControllers from '../controllers/PaymentsController.js';

const router = Router();
router.post('/makePayment', PaymentsControllers.makePayment);
router.post('/paymentStatus', PaymentsControllers.paymentStatus);
router.post('/canclePayment', PaymentsControllers.canclePayment);

export default router;
