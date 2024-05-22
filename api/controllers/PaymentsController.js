import PaymentsService from '../services/PaymentsService.js'

export default class PaymentsController {
	static async makePayment(req, res, next) {
		const {
			isAuth,
			bookingObj,
			checkSendInfo,
			selectedSeats,
			screeningBooking,
		} = req.body

		console.log(typeof isAuth)
		try {
			let paymentUrl = await PaymentsService.makePayment(
				isAuth,
				bookingObj,
				checkSendInfo,
				selectedSeats,
				screeningBooking
			)

			return res.status(200).json({ paymentUrl: paymentUrl })
		} catch (err) {
			next(err)
		}
	}

	static async paymentStatus(req, res, next) {
		const paymentNotification = req.body

		try {
			await PaymentsService.paymentStatus(paymentNotification)
			return res.status(200).json({ message: 'payment was successful' })
		} catch (err) {
			next(err)
		}
	}
}
