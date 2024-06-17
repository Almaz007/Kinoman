import { create } from 'zustand';
import $api from '../http/index';
import inMemoryJWT from '../Services/inMemoryJWT';
import ScreeningService from '../Services/ScreeningService';
import SeatService from '../Services/SeatService';
import PaymentService from '../Services/PaymentService';
import MovieService from '../Services/MovieService';
import config from '../config';
import axios from 'axios';
import { text } from '@fortawesome/fontawesome-svg-core';

export const authState = create((set, get) => ({
	userData: {},
	isAuth: false,
	isLoading: true,
	isSigninError: '',
	isSignupError: '',

	updateUserData: data => set({ userData: data }),

	handleSignUp: async (data, setShowModal, Swal) => {
		try {
			let response = await $api.post('/auth/sign-up', data);
			// const { userDto, accesToken, accesTokenExpiration } = response.data;
			// inMemoryJWT.setToken(accesToken, accesTokenExpiration);
			// set({ isAuth: true, userData: userDto, isErrorMessage: '' });
			setShowModal(false);
			Swal.fire({
				icon: 'success',
				title: 'Регистрация прошла успешно',
				text: 'Подтвердите аккаунт, перейдя по ссылке, отправленной на почту которую указали',
				ConfirmButtonText: 'Ок'
			});
		} catch (err) {
			const message =
				err.response?.data?.error ||
				`${err.message}, ${err.response?.data?.message}`;
			set({ isSignupError: message });
		}
	},
	handleSignIn: async (data, setShowModal, navigate) => {
		try {
			let response = await $api.post('/auth/sign-in', data);
			const { userDto, accesToken, accesTokenExpiration } = response.data;
			inMemoryJWT.setToken(accesToken, accesTokenExpiration);
			set({ isAuth: true, userData: userDto, isErrorMessage: '' });
			setShowModal(false);
			if (userDto.roleId === 2) navigate('/');
		} catch (err) {
			const message =
				err.response?.data?.error ||
				`${err.message}, ${err.response?.data?.message}`;
			set({ isSigninError: message });
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
	errors: {},
	updateErrors: errors => set({ errors: errors }),

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
			chequeSendInfo: {
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
	movies: [],

	fetchFormData: async () => {
		try {
			set({ isFormLoading: true });
			const resp = await MovieService.getFormData();
			const { ageLimits, genres } = resp.data;

			set({ ageLimits, genres });
		} catch (err) {
			const message =
				err.response?.data?.error ||
				`${err.message}, ${err.response?.data?.message}`;
			set({ isFormError: message });
		} finally {
			set({ isFormLoading: false });
		}
	},
	createMovie: async (data, navigate, Swal) => {
		try {
			const { imageFile: file, ...restData } = data;

			const formData = new FormData();
			formData.append('image', file);
			console.log({ formData });

			set({ isLodaingData: true });
			const resp = await $api.post('/files/upload/movieImg', formData);
			const posterLink = config.API_URL + resp.data.url;

			const movieData = { ...restData, posterLink };

			const resp2 = await $api.post('/movies/createMovie', { movieData });
			if (resp2.status !== 200)
				return Swal.showValidationMessage(`${resp2.message}`);

			navigate('/Movies');
		} catch (err) {
			const message = err.response?.data?.error || err.message;
			Swal.showValidationMessage(`Ошибка: ${message}`);
		}
	},
	updateMovie: async (data, navigate, Swal) => {
		try {
			const { imageFile: file, id, ...restData } = data;

			const formData = new FormData();
			formData.append('image', file);

			set({ isLodaingData: true });
			const resp = await $api.post('/files/upload/movieImg', formData);
			const posterLink = config.API_URL + resp.data.url;

			const movieData = { ...restData, posterLink };
			const resp2 = await $api.patch(`/movies/updateMovie/${id}`, {
				movieData
			});
			if (resp2.status !== 200)
				return Swal.showValidationMessage(`${resp2.message}`);

			navigate('/Movies');
		} catch (err) {
			const message = err.response?.data?.error || err.message;
			Swal.showValidationMessage(`Ошибка: ${message}`);
		}
	},
	getMovieDataById: async (id, reset, setImg) => {
		try {
			set({ isFormLoading: true });
			const resp = await $api.get('/movies/getMovieDataById', {
				params: {
					id: Number(id)
				}
			});
			const { posterLink, ...movieData } = resp.data;
			movieData['releaseDate'] = new Date(movieData['releaseDate']);
			setImg(posterLink);

			const blob = await axios({
				url: posterLink,
				method: 'GET',
				responseType: 'blob'
			});
			const file = new File([blob.data], posterLink);
			movieData['imageFile'] = file;
			reset(movieData);
		} catch (err) {
			const message =
				err.response?.data?.error ||
				`${err.message}, ${err.response?.data?.message}`;
			set({ isFormError: message });
		} finally {
			set({ isFormLoading: false });
		}
	},
	getAllMovies: async () => {
		try {
			const resp = await $api.get('/movies/getAllMovies');

			set({ movies: resp.data });
		} catch {}
	},

	deleteMovie: async (id, Swal) => {
		try {
			const resp = await $api.delete(`/movies/deleteMovie/${id}`);

			if (resp.status !== 200)
				return Swal.showValidationMessage(`${resp.message}`);

			const { movies } = get();
			const newMovies = movies.filter(movie => movie.id !== id);
			set({ movies: newMovies });
		} catch (err) {
			const message =
				err.response?.data?.error ||
				`${err.message}, ${err.response?.data?.message}`;
			Swal.showValidationMessage(`Ошибка: ${message}`);
		}
	}
}));

export const ProfileState = create((set, get) => ({
	isDataSendLoading: false,
	isImgLodaing: false,
	isErrorMessage: '',

	clearValues: () => {
		se({ isDataSendLoading: false, isImgLodaing: false, isErrorMessage: '' });
	},

	initFormData: async (userData, reset, setImg) => {
		try {
			const { posterLink, roleId, ...formData } = userData;

			if (posterLink) {
				set({ isImgLodaing: true });
				const blob = await axios({
					url: posterLink,
					method: 'GET',
					responseType: 'blob'
				});
				const file = new File([blob.data], posterLink);
				formData['imageFile'] = file;
				setImg(posterLink);
			}
			formData['password'] = '';
			formData['confirmPassword'] = '';
			console.log(formData);
			reset(formData);
		} catch (err) {
			const message = err.response.data?.error || err.message;
			set({ isErrorMessage: message });
		} finally {
			set({ isImgLodaing: false });
		}
	},
	updateProfileData: async (data, Swal) => {
		try {
			const { id, imageFile, confirmPassword, ...newUserData } = data;

			newUserData['posterLink'] = '';

			if (imageFile instanceof File) {
				const formData = new FormData();
				formData.append('image', imageFile);

				set({ isLodaingData: true });
				const resp = await $api.post('/files/upload/profileImg', formData);
				const posterLink = config.API_URL + resp.data.url;
				newUserData['posterLink'] = posterLink;
			}

			const response = await $api.patch(`/auth/updateUserData/${id}`, {
				newUserData
			});

			if (response.status !== 200) {
				return Swal.showValidationMessage(`${response.message}`);
			}

			const { userDto, accesToken, accesTokenExpiration } = response.data;
			inMemoryJWT.abortRefreshToken();
			inMemoryJWT.setToken(accesToken, accesTokenExpiration);
			return userDto;
		} catch (err) {
			const message = err.response.data?.error || err.message;
			Swal.showValidationMessage(`Ошибка: ${message}`);
		}
	}
}));
