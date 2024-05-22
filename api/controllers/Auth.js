import AuthService from '../services/Auth.js'
import ErrorsUtils from '../utils/Errors.js'
import { COOKIE_SETTINGS } from '../constants.js'
import prisma from '../db/db.config.js'

class AuthController {
	static async signIn(req, res, next) {
		const { email, password } = req.body
		const { fingerprint } = req

		try {
			const { accesToken, refreshToken, userDto, accesTokenExpiration } =
				await AuthService.signIn({
					email,
					password,
					fingerprint,
				})
			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ userDto, accesToken, accesTokenExpiration })
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err)
		}
	}

	static async signUp(req, res, next) {
		const { userName, email, phoneNumber, password } = req.body
		const { fingerprint } = req

		try {
			const { accesToken, refreshToken, userDto, accesTokenExpiration } =
				await AuthService.signUp({
					userName,
					email,
					phoneNumber,
					password,
					fingerprint,
				})
			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ userDto, accesToken, accesTokenExpiration })
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err)
		}
	}

	static async logOut(req, res, next) {
		let refreshToken = req.cookies.refreshToken
		try {
			await AuthService.logOut(refreshToken)

			res.clearCookie('refreshToken')

			return res.sendStatus(200)
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err)
		}
	}

	static async refresh(req, res, next) {
		const { fingerprint } = req

		let currentRefreshToken = req.cookies.refreshToken

		try {
			const { accesToken, refreshToken, userDto, accesTokenExpiration } =
				await AuthService.refresh({ fingerprint, currentRefreshToken })

			res.cookie('refreshToken', refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)
			return res.status(200).json({ userDto, accesToken, accesTokenExpiration })
		} catch (err) {
			// return ErrorsUtils.catchError(res, err)
			next(err)
		}
	}
	static async protectedQuery(req, res, nex) {
		const items =
			await prisma.$queryRaw`SELECT * FROM "Screenings" WHERE "screeningStart"::Text LIKE '2023-09-22%'`

		return res.status(200).json(items)
	}
}

export default AuthController
