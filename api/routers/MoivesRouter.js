import { Router } from 'express';
import MoviesController from '../controllers/MoviesController.js';

const router = Router();
router.get('/getFormData', MoviesController.getFormData);
router.get('/getAllMovies', MoviesController.getAllMovies);
router.get('/getMovieDataById', MoviesController.getMoviesDataById);
router.post('/createMovie', MoviesController.createMovie);
router.patch('/updateMovie/:id', MoviesController.updateMovie);
router.delete('/deleteMovie/:id', MoviesController.deleteMovie);

export default router;
