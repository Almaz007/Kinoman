import prisma from '../db/db.config.js';

export default class MoviesService {
	static async getFormData() {
		const genres = await prisma.genre.findMany();
		const ageLimits = await prisma.ageLimit.findMany();

		return { genres, ageLimits };
	}

	static async getAllMovies() {
		const movies = await prisma.movie.findMany();

		return movies;
	}

	static async createMovie(data, genres) {
		const movieGenres = genres.map(genreId => ({
			genre: {
				connect: {
					id: genreId
				}
			}
		}));

		const createdMovie = await prisma.movie.create({
			data: {
				...data,
				genres: {
					create: movieGenres
				}
			}
		});

		return createdMovie;
	}
	static async updateMovie(id, movieData, genres) {
		const movieGenres = genres.map(genreId => ({
			genre: {
				connect: {
					id: genreId
				}
			}
		}));

		const movie = await prisma.movie.update({
			where: { id: id },
			data: {
				...movieData,
				genres: {
					deleteMany: {}, // Удаляем текущие жанры
					create: movieGenres
				}
			}
		});

		return movie;
	}
	static async deleteMovie(id) {
		const movieDeleted = await prisma.movie.delete({
			where: {
				id: id
			}
		});

		return movieDeleted;
	}
	static async getMoviesDataById(id) {
		let movie = await prisma.movie.findUnique({
			where: {
				id: id
			}
		});

		if (!movie) {
			throw new Conflict('фильм не найден');
		}

		const genres = await prisma.movieGenre.findMany({
			where: {
				moiveId: id
			},
			select: {
				genreId: true
			}
		});

		if (!genres) genres = [];
		movie.genres = genres.map(genre => genre.genreId);

		return movie;
	}
}
