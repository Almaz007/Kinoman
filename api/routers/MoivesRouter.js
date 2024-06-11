import { Router } from 'express';
import MoviesController from '../controllers/MoviesController.js';

const router = Router();
router.get('/getFormData', MoviesController.getFormData);
router.post('/createMovie', MoviesController.createMovie);

export default router;
