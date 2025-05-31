import PaymentsService from '../services/PaymentsService.js';

export default class PaymentsController {
	static async makePayment(req, res, next) {
		const {
			isAuth,
			bookingObj,
			chequeSendInfo,
			selectedSeats,
			screeningBooking
		} = req.body;

		try {
			let paymentUrl = await PaymentsService.makePayment(
				isAuth,
				bookingObj,
				chequeSendInfo,
				selectedSeats,
				screeningBooking
			);

			return res.status(200).json({ paymentUrl: paymentUrl });
		} catch (err) {
			next(err);
		}
	}

	static async paymentStatus(req, res, next) {
		const paymentNotification = req.body;

		try {
			await PaymentsService.paymentStatus(paymentNotification);
			return res.status(200).json({ message: 'payment was successful' });
		} catch (err) {
			next(err);
		}
	}

	static async canclePayment(req, res, next) {
		const bookingId = +req.body.bookingId;

		try {
			const canceledBooking = await PaymentsService.canclePayment(bookingId);
			return res.status(200).json(canceledBooking);
		} catch {}
	}
}
