import prisma from '../db/db.config.js';

export default class MoviesService {
	static async getFormData(screeningId) {
		const genres = await prisma.genre.findMany();
		const ageLimits = await prisma.ageLimit.findMany();

		return { genres, ageLimits };
	}

	static async createMovie(data) {
		const createdMovie = await prisma.movie.create({ data: data });
		return createdMovie;
	}
}
