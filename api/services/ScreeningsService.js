import moment from 'moment';
import prisma from '../db/db.config.js';

export default class ScreeningsService {
	static async getScreeningsByDate(date) {
		const startDate = date.format('YYYY-MM-DD HH:mm:ss Z');
		const dateEnd = moment(date).add(1, 'day').format('YYYY-MM-DD');

		const screenings = await prisma.$queryRaw`
		 SELECT *
			FROM "Screenings"
			WHERE "screeningStart" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow' >= to_timestamp(${startDate}, 'YYYY-MM-DD HH24:MI:SS') AT TIME ZONE 'Europe/Moscow'
			AND "screeningStart"AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow' < TO_TIMESTAMP(${dateEnd}, 'YYYY-MM-DD HH24:MI:SS') AT TIME ZONE 'Europe/Moscow';
		`;
		return screenings;
	}

	static async getPosterMoviesByDate(date) {
		const screenings = await ScreeningsService.getScreeningsByDate(date);
		const moviesData = new Map();

		for (const screening of screenings) {
			if (!moviesData.has(screening.movieId)) {
				moviesData.set(screening.movieId, {
					...(await prisma.movie.findFirst({
						where: { id: screening.movieId }
					})),
					screenings: []
				});
			}

			screening.screeningStart = moment(screening.screeningStart)
				.tz('Europe/Moscow')
				.format('YYYY-MM-DD HH:mm:ss Z');

			moviesData.get(screening.movieId).screenings.push(screening);
		}

		const posterMovies = [];
		for (const [, movieInfo] of moviesData.entries()) {
			posterMovies.push(movieInfo);
		}

		return posterMovies;
	}

	static async getDatesForMovie(movieId) {
		// const currentDate = moment(new Date()).tz('Europe/Moscow')
		// const startDate = currentDate.format('YYYY-MM-DD HH:mm:ss Z')
		// const dateEnd = moment(currentDate).add(5, 'day').format('YYYY-MM-DD')
		const currentDate = moment('2024-05-22').tz('Europe/Moscow');
		const startDate = currentDate.format('YYYY-MM-DD HH:mm:ss Z');
		const dateEnd = moment(currentDate).add(5, 'day').format('YYYY-MM-DD');

		console.log(startDate);
		console.log(dateEnd);

		const screenings = await prisma.$queryRaw`
		 SELECT *
			FROM "Screenings"
			WHERE "screeningStart" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow' >= to_timestamp(${startDate}, 'YYYY-MM-DD HH24:MI:SS') AT TIME ZONE 'Europe/Moscow'
			AND "screeningStart"AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow' < TO_TIMESTAMP(${dateEnd}, 'YYYY-MM-DD HH24:MI:SS') AT TIME ZONE 'Europe/Moscow'
			AND "movieId" = ${+movieId}
		`;

		const dates = new Set();

		screenings.forEach(screening => {
			const newDate = moment(screening.screeningStart)
				.tz('Europe/Moscow')
				.format('YYYY-MM-DD');

			dates.add(newDate);
		});
		const arr = [...dates.values()];
		return arr;
	}

	static async getScreeningsForDate(date, movieId) {
		const startDate = moment(date)
			.tz('Europe/Moscow')
			.format('YYYY-MM-DD HH:mm:ss Z');
		const endDate = moment(date)
			.add(1, 'day')
			.tz('Europe/Moscow')
			.format('YYYY-MM-DD');

		const screenings = await prisma.$queryRaw`
		 SELECT *
			FROM "Screenings"
			WHERE "screeningStart" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow' >= to_timestamp(${startDate}, 'YYYY-MM-DD HH24:MI:SS') AT TIME ZONE 'Europe/Moscow'
			AND "screeningStart"AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Moscow' < TO_TIMESTAMP(${endDate}, 'YYYY-MM-DD HH24:MI:SS') AT TIME ZONE 'Europe/Moscow'
			AND "movieId" = ${+movieId}
		`;

		screenings.forEach(screening => {
			screening.screeningStart = moment(screening.screeningStart)
				.tz('Europe/Moscow')
				.format('YYYY-MM-DD HH:mm:ss Z');
		});

		return screenings;
	}
}
