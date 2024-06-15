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
	static async getAllMovies(req, res, next) {
		try {
			const data = await MoviesService.getAllMovies();

			return res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}

	static async createMovie(req, res, next) {
		try {
			const { genres, ...data } = req.body.movieData;
			console.log(req.body.movieData);
			const movieData = await MoviesService.createMovie(data, genres);

			res.status(200).json(movieData);
		} catch (err) {
			next(err);
		}
	}
	static async updateMovie(req, res, next) {
		try {
			const movieId = Number(req.params.id);
			const { genres, ...movieData } = req.body.movieData;

			const updatedMovie = await MoviesService.updateMovie(
				movieId,
				movieData,
				genres
			);

			res.status(200).json(updatedMovie);
		} catch (err) {
			next(err);
		}
	}
	static async deleteMovie(req, res, next) {
		try {
			const movieId = Number(req.params.id);

			const deletedMovie = await MoviesService.deleteMovie(movieId);

			res.status(200).json(deletedMovie);
		} catch (err) {
			next(err);
		}
	}
	static async getMoviesDataById(req, res, next) {
		try {
			const { id } = req.query;

			const movieData = await MoviesService.getMoviesDataById(Number(id));
			res.status(200).json(movieData);
		} catch (err) {
			next(err);
		}
	}
}

export default MoviesController;
