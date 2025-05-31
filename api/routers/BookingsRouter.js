import { Router } from 'express';
import BookingsController from '../controllers/BookingsController.js';

const router = Router();
router.get('/getBookings/:email/:id', BookingsController.getBookingsByEmail);

export default router;
