import SeatsService from '../services/SeatsService.js'

export default class SeatssController {
	static async getSeatsInfo(req, res, next) {
		const { screeningId, auditoriumId } = req.query
		try {
			const seatsInfo = await SeatsService.getSeatsInfo(
				+screeningId,
				+auditoriumId
			)

			return res.status(200).json(seatsInfo)
		} catch (err) {
			next(err)
		}
	}
}
