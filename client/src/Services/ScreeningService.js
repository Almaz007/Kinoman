import axios from 'axios'

export default class ScreeningService {
	static async getPosterMoviesByDate(date) {
		return await axios.get(
			`http://localhost:5000/api/screenings/getPosterMoviesByDate`,
			{
				params: {
					date: date,
				},
			}
		)
	}
	static async getDatesForMovie(movieId) {
		return await axios.get(
			`http://localhost:5000/api/screenings/getDatesForMovie`,
			{
				params: {
					movieId,
				},
			}
		)
	}
	static async getScreeningsForDate(date, movieId, abortController) {
		return await axios.get(
			`http://localhost:5000/api/screenings/getScreeningsForDate`,
			{
				params: {
					date,
					movieId,
				},
				signal: abortController.signal,
			}
		)
	}
}
