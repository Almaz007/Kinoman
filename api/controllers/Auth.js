import AuthService from '../services/Auth.js';
import ErrorsUtils from '../utils/Errors.js';
import { COOKIE_SETTINGS } from '../constants.js';
import prisma from '../db/db.config.js';

class AuthController {
	static async signIn(req, res, next) {
		const { email, password } = req.body;
		const { fingerprint } = req;

		try {
			const { accesToken, refreshToken, userDto, accesTokenExpiration } =
				await AuthService.signIn({
					email,
					password,
					fingerprint
				});
			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

			return res
				.status(200)
				.json({ userDto, accesToken, accesTokenExpiration });
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err);
		}
	}

	static async signUp(req, res, next) {
		const { userName, email, phoneNumber, password } = req.body;
		const { fingerprint } = req;

		try {
			await AuthService.signUp({
				userName,
				email,
				phoneNumber,
				password,
				fingerprint
			});

			return res.status(200).json({ message: 'регистрация прошла успешно' });
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err);
		}
	}
	// static async signUp(req, res, next) {
	// 	const { userName, email, phoneNumber, password } = req.body;
	// 	const { fingerprint } = req;

	// 	try {
	// 		const { accesToken, refreshToken, userDto, accesTokenExpiration } =
	// 			await AuthService.signUp({
	// 				userName,
	// 				email,
	// 				phoneNumber,
	// 				password,
	// 				fingerprint
	// 			});
	// 		res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

	// 		return res
	// 			.status(200)
	// 			.json({ userDto, accesToken, accesTokenExpiration });
	// 	} catch (err) {
	// 		// return ErrorsUtils.catchError(res, err)
	// 		next(err);
	// 	}
	// }
	static async logOut(req, res, next) {
		let refreshToken = req.cookies.refreshToken;
		try {
			await AuthService.logOut(refreshToken);

			res.clearCookie('refreshToken');

			return res.sendStatus(200);
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err);
		}
	}

	static async refresh(req, res, next) {
		const { fingerprint } = req;

		let currentRefreshToken = req.cookies.refreshToken;

		try {
			const { accesToken, refreshToken, userDto, accesTokenExpiration } =
				await AuthService.refresh({ fingerprint, currentRefreshToken });

			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
			return res
				.status(200)
				.json({ userDto, accesToken, accesTokenExpiration });
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err);
		}
	}
	static async activate(req, res, next) {
		try {
			const activationLink = req.params.link;

			await AuthService.activate(activationLink);
			return res.redirect(`${process.env.CLIENT_URL}/SuccesResult`);
		} catch (e) {
			return res.redirect(`${process.env.CLIENT_URL}/ErrorResult`);
		}
	}

	static async updateUserData(req, res, next) {
		const { fingerprint } = req;

		const userData = req.body.newUserData;
		if (!userData.password) {
			delete userData.password;
		}
		console.log(userData);
		const userId = Number(req.params.id);
		let currentRefreshToken = req.cookies.refreshToken;

		try {
			const { accesToken, refreshToken, userDto, accesTokenExpiration } =
				await AuthService.updateUserData({
					fingerprint,
					currentRefreshToken,
					userId,
					userData
				});

			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
			return res
				.status(200)
				.json({ userDto, accesToken, accesTokenExpiration });
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err);
		}
	}
}

export default AuthController;
