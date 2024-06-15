import ScreeningsService from '../services/ScreeningsService.js';
import moment from 'moment-timezone';

export default class ScreeningsController {
	static async getPosterMoviesByDate(req, res, next) {
		let { date } = req.query;

		date = moment(date).tz('Europe/Moscow');
		console.log(date, 'date');
		const currentDate = moment(new Date()).tz('Europe/Moscow');

		if (date.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')) {
			date = currentDate;
		}

		try {
			const posterMovies = await ScreeningsService.getPosterMoviesByDate(date);

			return res.status(200).json(posterMovies);
		} catch (err) {
			next(err);
		}
	}

	static async getDatesForMovie(req, res, next) {
		const { movieId } = req.query;
		try {
			const dates = await ScreeningsService.getDatesForMovie(movieId);
			return res.status(200).json(dates);
		} catch (err) {
			next(err);
		}
	}
	static async getScreeningsForDate(req, res, next) {
		let { date, movieId } = req.query;

		date = moment(date).tz('Europe/Moscow');

		const currentDate = moment(new Date()).tz('Europe/Moscow');

		if (date.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD')) {
			date = currentDate;
		}

		try {
			const screenings = await ScreeningsService.getScreeningsForDate(
				date,
				movieId
			);
			return res.status(200).json(screenings);
		} catch (err) {
			next(err);
		}
	}
}
