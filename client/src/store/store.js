import { create } from 'zustand';
import $api from '../http/index';
import inMemoryJWT from '../Services/inMemoryJWT';
import ScreeningService from '../Services/ScreeningService';
import SeatService from '../Services/SeatService';
import PaymentService from '../Services/PaymentService';
import MovieService from '../Services/MovieService';
import config from '../config';

export const authState = create((set, get) => ({
	userData: {},
	isAuth: false,
	isLoading: true,

	updateIsAuth: bool => set(() => ({ isAuth: bool })),
	updateIsLoading: bool => set(() => ({ isLoading: bool })),

	handleSignUp: async (data, setShowModal) => {
		try {
			let response = await $api.post('/auth/sign-up', data);
			const { userDto, accesToken, accesTokenExpiration } = response.data;
			inMemoryJWT.setToken(accesToken, accesTokenExpiration);
			set({ isAuth: true, userData: userDto });
			setShowModal(false);
		} catch (err) {
			console.log(err);
		}
	},
	handleSignIn: async (data, setShowModal, navigate) => {
		try {
			let response = await $api.post('/auth/sign-in', data);
			const { userDto, accesToken, accesTokenExpiration } = response.data;
			inMemoryJWT.setToken(accesToken, accesTokenExpiration);
			set({ isAuth: true, userData: userDto });
			setShowModal(false);
			if (userDto.roleId === 2) navigate('/');
		} catch (err) {
			console.log(err);
		}
	},
	handleLogOut: async navigate => {
		const { userData } = get();
		try {
			await $api.post('/auth/logout');
			inMemoryJWT.deleteToken();
			set({ isAuth: false, userData: {} });
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	},
	handleCheckAuth: async () => {
		try {
			const response = await $api.post('/auth/refresh');
			const { userDto, accesToken, accesTokenExpiration } = response.data;

			inMemoryJWT.setToken(accesToken, accesTokenExpiration);
			set({ isAuth: true, userData: userDto });
		} catch (err) {
			console.log(err);
		} finally {
			set({ isLoading: false });
		}
	}
}));

export const PosterMoviesState = create(set => ({
	posterMovies: [],
	isLoading: false,
	isError: '',

	generateDateList: () => {
		return [
			'2024-05-22',
			'2024-05-23',
			'2024-05-24',
			'2024-05-25',
			'2024-05-26'
		];
	},
	selectedDate: '',
	updateSelectedDate: date => {
		return set({ selectedDate: date });
	},

	fetchPosterMovies: async date => {
		try {
			set({ isLoading: true });
			let response = await ScreeningService.getPosterMoviesByDate(date);
			console.log(response);
			set({ posterMovies: response.data });
		} catch (err) {
			set({ isError: err.message });
		} finally {
			// setTimeout(() => set({ isLoading: false }), 1500)
			set({ isLoading: false });
		}
	}
}));
export const SingleMovieState = create(set => ({
	screeningsByDate: [],
	isLoadingScreenings: false,
	isErrorScreenings: '',

	dateList: [],
	isLoadingDate: false,
	isErrorDate: '',

	fetchDate: async movieId => {
		try {
			set({ isLoadingDate: true });
			let response = await ScreeningService.getDatesForMovie(movieId);
			console.log(response);
			set({ dateList: response.data });
		} catch (err) {
			set({ isErrorDate: err.message });
		} finally {
			set({ isLoadingDate: false });
		}
	},

	fetchScreenings: async (date, movieId, abortController) => {
		try {
			set({ isLoadingScreenings: true });
			let response = await ScreeningService.getScreeningsForDate(
				date,
				movieId,
				abortController
			);
			set({ screeningsByDate: response.data });
		} catch (err) {
			if (err.name !== 'CanceledError') {
				set({ isErrorScreenings: err.message });
			}
		} finally {
			set({ isLoadingScreenings: false });
		}
	}
}));
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
		phoneNumber: ''
	},
	updateСhequeSendInfo: (email, phoneNumber) => {
		set({ chequeSendInfo: { email, phoneNumber } });
	},
	getСhequeSendInfo: () => {
		const { chequeSendInfo } = get();
		const { email, phoneNumber } = chequeSendInfo;
		return { defaultEmail: email, defaultPhoneNumber: phoneNumber };
	},

	stage: 0,

	decStage: () => {
		const { stage } = get();
		set({ stage: stage - 1 });
	},
	incStage: () => {
		const { stage } = get();
		set({ stage: stage + 1 });
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
				phoneNumber: ''
			}
		});
	},
	createScreeningBooking: (movie, screeningData) => {
		const { screeningBooking } = get();
		if (screeningBooking.id === screeningData.id) return;

		const { resetState } = get();
		resetState();

		const { title, duration, rating } = movie;
		const { id, cost, auditoriumId, quality } = screeningData;

		const newData = {
			id,
			title,
			duration,
			rating,
			cost,
			auditoriumId,
			quality
		};

		set({ screeningBooking: newData });
	},
	fetchSeatsInfo: async () => {
		const { screeningBooking } = get();
		const { id: screeningId, auditoriumId } = screeningBooking;

		try {
			set({ isLoading: true });

			let response = await SeatService.getSeatsInfo(screeningId, auditoriumId);

			set({ seatsInfo: response.data });
		} catch (err) {
			set({ isError: err.message });
		} finally {
			set({ isLoading: false });
		}
	},
	addAndDeleteSelectedSeats: seatData => {
		const { selectedSeats } = get();
		if (selectedSeats.find(seat => seat.id === seatData.id)) {
			set({
				selectedSeats: selectedSeats.filter(seat => seat.id !== seatData.id)
			});
		} else {
			set({ selectedSeats: [...selectedSeats, seatData] });
		}
	},
	payment: async (userId, isAuth) => {
		const { screeningBooking, selectedSeats, checkSendInfo } = get();
		set({ isLoading: true });
		try {
			let dateToday = new Date();

			let bookingObj = {
				screeningId: screeningBooking.id,
				userId,
				timePurchase: dateToday,
				amountSeat: selectedSeats.length,
				cost: screeningBooking.cost
			};

			const response = await PaymentService.makePayment(
				isAuth,
				bookingObj,
				checkSendInfo,
				selectedSeats,
				screeningBooking
			);

			const { paymentUrl } = response.data;

			return paymentUrl;
		} catch (err) {
			console.log(err);
		}
	}
}));

export const moviesState = create((set, get) => ({
	isFormLoading: false,
	isFormError: '',
	ageLimits: [],
	genres: [],

	fetchFormData: async () => {
		try {
			set({ isFormLoading: true });
			const resp = await MovieService.getFormData();
			const { ageLimits, genres } = resp.data;

			console.log(ageLimits);
			console.log(genres);
			set({ ageLimits, genres });
		} catch (err) {
			set({ isFormError: err.message });
		} finally {
			set({ isFormLoading: false });
		}
	},

	createMovie: async (data, navigate) => {
		try {
			const { imageFile: file, ...restData } = data;

			const formData = new FormData();
			formData.append('image', file);
			const resp = await $api.post('/files/upload/movieImg', formData);
			const posterLink = config.API_URL + resp.data.url;

			const movieData = { ...restData, posterLink };

			const resp2 = await $api.post('/movies/createMovie', { movieData });

			navigate('/Movies');
		} catch (err) {
			set({ isAddError: err.message });
		}
	}
}));
