import { create } from 'zustand'
import $api from '../http/index'
import inMemoryJWT from '../Services/inMemoryJWT'
import ScreeningService from '../Services/ScreeningService'
import SeatService from '../Services/SeatService'
import PaymentService from '../Services/PaymentService'

export const authState = create(set => ({
	userData: {},
	isAuth: false,
	isLoading: true,

	updateIsAuth: bool => set(() => ({ isAuth: bool })),
	updateIsLoading: bool => set(() => ({ isLoading: bool })),

	handleSignUp: async (data, setShowModal) => {
		try {
			let response = await $api.post('/auth/sign-up', data)
			const { userDto, accesToken, accesTokenExpiration } = response.data
			inMemoryJWT.setToken(accesToken, accesTokenExpiration)
			set({ isAuth: true, userData: userDto })
			setShowModal(false)
		} catch (err) {
			console.log(err)
		}
	},
	handleSignIn: async (data, setShowModal) => {
		try {
			let response = await $api.post('/auth/sign-in', data)
			const { userDto, accesToken, accesTokenExpiration } = response.data
			inMemoryJWT.setToken(accesToken, accesTokenExpiration)
			set({ isAuth: true, userData: userDto })
			setShowModal(false)
		} catch (err) {
			console.log(err)
		}
	},
	handleLogOut: async () => {
		try {
			await $api.post('/auth/logout')
			inMemoryJWT.deleteToken()
			set({ isAuth: false, userData: [] })
		} catch (err) {
			console.log(err)
		}
	},
	handleCheckAuth: async () => {
		try {
			const response = await $api.post('/auth/refresh')
			const { userDto, accesToken, accesTokenExpiration } = response.data

			inMemoryJWT.setToken(accesToken, accesTokenExpiration)
			set({ isAuth: true, userData: userDto })
		} catch (err) {
			console.log(err)
		} finally {
			set({ isLoading: false })
		}
	},
}))

export const PosterMoviesState = create(set => ({
	posterMovies: [],
	isLoading: false,
	isError: '',

	generateDateList: () => {
		return [
			'2023-09-22',
			'2023-09-23',
			'2023-09-24',
			'2023-09-25',
			'2023-09-26',
		]
	},
	selectedDate: '',
	updateSelectedDate: date => {
		return set({ selectedDate: date })
	},

	fetchPosterMovies: async date => {
		try {
			set({ isLoading: true })
			let response = await ScreeningService.getPosterMoviesByDate(date)
			console.log(response)
			set({ posterMovies: response.data })
		} catch (err) {
			set({ isError: err.message })
		} finally {
			// setTimeout(() => set({ isLoading: false }), 1500)
			set({ isLoading: false })
		}
	},
}))
export const SingleMovieState = create(set => ({
	screeningsByDate: [],
	isLoadingScreenings: false,
	isErrorScreenings: '',

	dateList: [],
	isLoadingDate: false,
	isErrorDate: '',

	fetchDate: async movieId => {
		try {
			set({ isLoadingDate: true })
			let response = await ScreeningService.getDatesForMovie(movieId)
			set({ dateList: response.data })
		} catch (err) {
			set({ isErrorDate: err.message })
		} finally {
			set({ isLoadingDate: false })
		}
	},

	fetchScreenings: async (date, movieId, abortController) => {
		try {
			set({ isLoadingScreenings: true })
			let response = await ScreeningService.getScreeningsForDate(
				date,
				movieId,
				abortController
			)
			set({ screeningsByDate: response.data })
		} catch (err) {
			if (err.name !== 'CanceledError') {
				set({ isErrorScreenings: err.message })
			}
		} finally {
			set({ isLoadingScreenings: false })
		}
	},
}))
export const screeningBookingState = create((set, get) => ({
	isLoading: false,
	isError: '',
	firstRender: false,
	updateFirstRender: bool => set({ firstRender: bool }),

	screeningBooking: {},
	seatsInfo: [],
	selectedSeats: [],
	chequeSendInfo: {
		email: '',
		phoneNumber: '',
	},
	updateСhequeSendInfo: (email, phoneNumber) => {
		set({ chequeSendInfo: { email, phoneNumber } })
	},
	getСhequeSendInfo: () => {
		const { chequeSendInfo } = get()
		const { email, phoneNumber } = chequeSendInfo
		return { defaultEmail: email, defaultPhoneNumber: phoneNumber }
	},

	stage: 0,

	decStage: () => {
		const { stage } = get()
		set({ stage: stage - 1 })
	},
	incStage: () => {
		const { stage } = get()
		set({ stage: stage + 1 })
	},

	resetState: () => {
		set({
			isLoading: false,
			isError: '',
			firstRender: true,
			screeningBooking: {},
			seatsInfo: [],
			selectedSeats: [],
			stage: 0,
			checkSendInfo: {
				email: '',
				phoneNumber: '',
			},
		})
	},
	createScreeningBooking: (movie, screeningData) => {
		const { screeningBooking } = get()
		if (screeningBooking.id === screeningData.id) return

		const { resetState } = get()
		resetState()

		const { title, duration, rating } = movie
		const { id, cost, auditoriumId, quality } = screeningData

		const newData = {
			id,
			title,
			duration,
			rating,
			cost,
			auditoriumId,
			quality,
		}

		set({ screeningBooking: newData })
	},
	fetchSeatsInfo: async () => {
		const { screeningBooking } = get()
		const { id: screeningId, auditoriumId } = screeningBooking

		try {
			set({ isLoading: true })

			let response = await SeatService.getSeatsInfo(screeningId, auditoriumId)

			set({ seatsInfo: response.data })
		} catch (err) {
			set({ isError: err.message })
		} finally {
			set({ isLoading: false })
		}
	},
	addAndDeleteSelectedSeats: seatData => {
		const { selectedSeats } = get()
		if (selectedSeats.find(seat => seat.id === seatData.id)) {
			set({
				selectedSeats: selectedSeats.filter(seat => seat.id !== seatData.id),
			})
		} else {
			set({ selectedSeats: [...selectedSeats, seatData] })
		}
	},
	payment: async (userId, isAuth) => {
		const { screeningBooking, selectedSeats, checkSendInfo } = get()
		set({ isLoading: true })
		try {
			let dateToday = new Date()

			let bookingObj = {
				screeningId: screeningBooking.id,
				userId,
				timePurchase: dateToday,
				amountSeat: selectedSeats.length,
				cost: screeningBooking.cost,
			}

			const response = await PaymentService.makePayment(
				isAuth,
				bookingObj,
				checkSendInfo,
				selectedSeats,
				screeningBooking
			)

			const { paymentUrl } = response.data

			return paymentUrl
		} catch (err) {
			console.log(err)
		}
	},
}))
