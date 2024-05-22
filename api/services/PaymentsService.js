import prisma from '../db/db.config.js'
import { YooCheckout } from '@a2seven/yoo-checkout'
import { v4 as uuidv4 } from 'uuid'
import BookingsService from './BookingsService.js'
import ReservedSeatsService from './ReservedSeats.js'
import { join } from '@prisma/client/runtime/library.js'

export default class PaymentsService {
	static async makePayment(
		isAuth,
		bookingObj,
		checkSendInfo,
		selectedSeats,
		screeningBooking
	) {
		const checkout = new YooCheckout({
			shopId: process.env.SHOP_ID,
			secretKey: process.env.YOOKASSA_API_KEY,
		})
		const idempotenceKey = uuidv4()
		const createPayload = {
			amount: {
				value: (Number(screeningBooking.cost) * selectedSeats.length).toFixed(
					2
				),
				currency: 'RUB',
			},
			confirmation: {
				type: 'redirect',
				return_url: 'http://localhost:5173/ThankPage',
			},
			metadata: {
				isAuth: isAuth,
				checkSendInfo: JSON.stringify(checkSendInfo),
				bookingObj: JSON.stringify(bookingObj),
				selectedSeats: JSON.stringify(selectedSeats),
				screeningBooking: JSON.stringify(screeningBooking),
			},
			capture: true,
		}

		const payment = await checkout.createPayment(createPayload, idempotenceKey)
		return payment['confirmation']['confirmation_url']
	}

	static async paymentStatus(paymentNotification) {
		if (paymentNotification.event === 'payment.succeeded') {
			const metaData = paymentNotification.object.metadata
			// console.log(JSON.parse(metaData['selectedSeats']))
			let {
				isAuth,
				checkSendInfo,
				selectedSeats,
				screeningBooking,
				bookingObj,
			} = metaData

			isAuth = JSON.parse(isAuth)
			checkSendInfo = JSON.parse(checkSendInfo)
			selectedSeats = JSON.parse(selectedSeats)
			screeningBooking = JSON.parse(screeningBooking)
			bookingObj = JSON.parse(bookingObj)

			if (!isAuth) {
				let { id } = await prisma.unauthorizedUser.create({
					data: {
						email: checkSendInfo.email,
						phoneNumber: checkSendInfo.phoneNumber,
					},
				})
				bookingObj['unauthorizedUserId'] = id
			}

			let newBooking = await BookingsService.createBooking(bookingObj)
			// console.log(newBooking)

			let newReservedSeats = await ReservedSeatsService.createReservedSeats(
				selectedSeats,
				screeningBooking.id,
				newBooking.id
			)
			// console.log(newReservedSeats)
		}
	}
}
