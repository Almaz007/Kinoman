import prisma from '../db/db.config.js';
import moment from 'moment-timezone';

export default class BookingsService {
	static async createBooking(booking) {
		const newBooking = await prisma.booking.create({
			data: booking
		});

		return newBooking;
	}
	static async getBookings(email, id) {
		const UnauthorizedUsersBookings = [];

		const unauthorizedUsers = await prisma.unauthorizedUser.findMany({
			where: {
				email: email
			},
			select: {
				id: true
			}
		});

		if (unauthorizedUsers) {
			const IdsUnauthorizedUsers = unauthorizedUsers.map(user => user.id);

			for (const id of IdsUnauthorizedUsers) {
				const booking = await prisma.booking.findFirst({
					where: {
						unauthorizedUserId: id
					},
					include: {
						screening: {
							include: {
								movie: {
									include: {
										genres: {
											select: {
												genre: {
													select: {
														name: true
													}
												}
											}
										}
									}
								}
							}
						},
						reservedSeats: true
					}
				});

				booking['timePurchase'] = moment(booking['timePurchase'])
					.tz('Europe/Moscow')
					.format('YYYY-MM-DD HH:mm:ss Z');
				booking['screening']['screeningStart'] = moment(
					booking['screening']['screeningStart']
				)
					.tz('Europe/Moscow')
					.format('YYYY-MM-DD HH:mm:ss Z');

				UnauthorizedUsersBookings.push(booking);
			}
		}

		const userBookings = await prisma.booking.findMany({
			where: {
				userId: id
			},
			include: {
				screening: {
					include: {
						movie: {
							include: {
								genres: {
									select: {
										genre: {
											select: {
												name: true
											}
										}
									}
								}
							}
						}
					}
				},
				reservedSeats: true
			}
		});

		userBookings.forEach(userBooking => {
			userBooking['timePurchase'] = moment(userBooking['timePurchase'])
				.tz('Europe/Moscow')
				.format('YYYY-MM-DD HH:mm:ss Z');
			userBooking['screening']['screeningStart'] = moment(
				userBooking['screening']['screeningStart']
			)
				.tz('Europe/Moscow')
				.format('YYYY-MM-DD HH:mm:ss Z');
		});

		const resultBookings = [...userBookings, ...UnauthorizedUsersBookings];

		return resultBookings;
	}
}
