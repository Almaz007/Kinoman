import MoviesService from '../services/MoviesService.js';

class MoviesController {
	static async getFormData(req, res, next) {
		try {
			const data = await MoviesService.getFormData();

			return res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	static async createMovie(req, res, next) {
		try {
			const { genres, ...data } = req.body.movieData;
			console.log(req.body.movieData);
			// const movieData = await MoviesService.createMovie(data);

			res.status(200).json(movieData);
		} catch (err) {
			next(err);
		}
	}
}

export default MoviesController;
