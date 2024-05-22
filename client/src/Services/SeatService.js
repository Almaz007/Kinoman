import axios from 'axios'

export default class SeatService {
	static async getSeatsInfo(screeningId, auditoriumId) {
		return await axios.get(`http://localhost:5000/api/seats/getSeatsInfo`, {
			params: {
				screeningId,
				auditoriumId,
			},
		})
	}
}
