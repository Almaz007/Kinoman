import prisma from '../db/db.config.js'

export default class BookingsService {
	static async createBooking(booking) {
		const newBooking = await prisma.booking.create({
			data: booking,
		})

		return newBooking
	}
}
