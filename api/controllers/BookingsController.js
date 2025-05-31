import BookingsService from '../services/BookingsService.js';

class BookingsController {
	static async getBookingsByEmail(req, res, next) {
		const id = +req.params.id;
		const email = req.params.email;

		try {
			const data = await BookingsService.getBookings(email, id);

			return res.status(200).json(data);
		} catch (err) {
			next(err);
		}
	}
}

export default BookingsController;
