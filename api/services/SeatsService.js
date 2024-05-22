import prisma from '../db/db.config.js'
import ReservedSeatsService from './ReservedSeats.js'
import getMaxRow from '../utils/getMaxRow.js'

export default class SeatsService {
	static async getSeatsInfo(screeningId, auditoriumId) {
		//получаем места с auditoriumId
		let seats = await prisma.seat.findMany({
			where: {
				auditoriumId: auditoriumId,
			},
		})

		//получем забронированные места, принадлежащие данному сеансу
		let reservedSeats =
			await ReservedSeatsService.getReservedSeatsByScreeningId(screeningId)

		seats.forEach(seat => {
			if (reservedSeats.find(reservedSeat => reservedSeat.seatId == seat.id)) {
				seat['reserved'] = true
			}
		})

		const seatsArray = []
		const maxRow = getMaxRow(seats)

		for (let row = 1; row <= maxRow; row++) {
			let newArr = []
			seats.forEach(seat => {
				if (seat.row === row) newArr.push(seat)
			})
			seatsArray.push(newArr)
		}

		return seatsArray
	}
}
