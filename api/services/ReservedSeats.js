import prisma from '../db/db.config.js'

export default class ReservedSeatsService {
	static async getReservedSeatsByScreeningId(screeningId) {
		let seats = await prisma.reservedSeat.findMany({
			where: {
				screeningId: screeningId,
			},
		})

		return seats
	}

	static async createReservedSeats(selectedSeats, screeningId, bookingId) {
		let reserveadSeats = selectedSeats.map(seat => ({
			seatId: seat.id,
			screeningId,
			bookingId,
		}))

		const newReservedSeats = await prisma.reservedSeat.createMany({
			data: reserveadSeats,
		})

		return newReservedSeats
	}
}
