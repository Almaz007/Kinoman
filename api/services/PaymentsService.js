import prisma from '../db/db.config.js';
import { YooCheckout } from '@a2seven/yoo-checkout';
import { v4 as uuidv4 } from 'uuid';
import BookingsService from './BookingsService.js';
import ReservedSeatsService from './ReservedSeats.js';
import { join } from '@prisma/client/runtime/library.js';

export default class PaymentsService {
	static async makePayment(
		isAuth,
		bookingObj,
		chequeSendInfo,
		selectedSeats,
		screeningBooking
	) {
		const checkout = new YooCheckout({
			shopId: process.env.SHOP_ID,
			secretKey: process.env.YOOKASSA_API_KEY
		});
		const idempotenceKey = uuidv4();
		const createPayload = {
			amount: {
				value: (Number(screeningBooking.cost) * selectedSeats.length).toFixed(
					2
				),
				currency: 'RUB'
			},
			confirmation: {
				type: 'redirect',
				return_url: 'http://localhost:5173/ThankPage'
			},
			metadata: {
				isAuth: isAuth,
				chequeSendInfo: JSON.stringify(chequeSendInfo),
				bookingObj: JSON.stringify(bookingObj),
				selectedSeats: JSON.stringify(selectedSeats),
				screeningBooking: JSON.stringify(screeningBooking)
			},
			capture: true
		};

		const payment = await checkout.createPayment(createPayload, idempotenceKey);
		console.log(payment, 'создан объект платежа');
		return payment['confirmation']['confirmation_url'];
	}

	static async paymentStatus(paymentNotification) {
		if (paymentNotification.event === 'payment.succeeded') {
			const metaData = paymentNotification.object.metadata;
			// console.log(JSON.parse(metaData['selectedSeats']))

			console.log();

			let {
				isAuth,
				chequeSendInfo,
				selectedSeats,
				screeningBooking,
				bookingObj
			} = metaData;

			isAuth = JSON.parse(isAuth);
			chequeSendInfo = JSON.parse(chequeSendInfo);
			selectedSeats = JSON.parse(selectedSeats);
			screeningBooking = JSON.parse(screeningBooking);
			bookingObj = JSON.parse(bookingObj);

			if (!isAuth) {
				let { id } = await prisma.unauthorizedUser.create({
					data: {
						email: chequeSendInfo.email,
						phoneNumber: chequeSendInfo.phoneNumber
					}
				});
				bookingObj['unauthorizedUserId'] = id;
			}

			bookingObj['paymentId'] = paymentNotification.object.id;
			bookingObj['status'] = 'success';

			let newBooking = await BookingsService.createBooking(bookingObj);
			// console.log(newBooking)

			let newReservedSeats = await ReservedSeatsService.createReservedSeats(
				selectedSeats,
				screeningBooking.id,
				newBooking.id
			);
			console.log(newReservedSeats);
		}
	}

	static async canclePayment(bookingId) {
		const booking = await prisma.booking.findFirst({
			where: {
				id: bookingId
			}
		});
		if (!booking) {
			throw new Conflict('Бронирование не найдено');
		}

		const checkout = new YooCheckout({
			shopId: process.env.SHOP_ID,
			secretKey: process.env.YOOKASSA_API_KEY
		});

		const paymentId = booking.paymentId;
		const idempotenceKey = uuidv4();

		const createRefundPayload = {
			payment_id: paymentId,
			amount: {
				value: (booking.amountSeat * booking.cost).toFixed(2),
				currency: 'RUB'
			}
		};

		const refund = await checkout.createRefund(
			createRefundPayload,
			idempotenceKey
		);

		if (refund.status === 'canceled') {
			throw new Conflict('Не удалось отменить бронирование');
		}

		const updatedBooking = await prisma.booking.update({
			where: {
				id: bookingId
			},
			data: {
				status: 'canceled'
			}
		});

		return updatedBooking;
	}
}
