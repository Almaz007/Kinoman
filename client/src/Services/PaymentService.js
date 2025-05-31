import axios from 'axios';
import $api from '../http';
export default class PaymentService {
	static async makePayment(
		isAuth,
		bookingObj,
		chequeSendInfo,
		selectedSeats,
		screeningBooking
	) {
		return await $api.post(`/payments/makePayment`, {
			isAuth,
			bookingObj,
			chequeSendInfo,
			selectedSeats,
			screeningBooking
		});
	}
}
