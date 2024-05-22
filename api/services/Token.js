import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import prisma from '../db/db.config.js'

dotenv.config()

class TokenService {
	static generateAccessToken(payload) {
		return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '30m',
		})
	}

	static generateRefreshToken(payload) {
		return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '15d',
		})
	}

	static verifyRefreshToken(refreshToken) {
		try {
			const userData = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			)
			return userData
		} catch (e) {
			return null
		}
	}

	static verifyAccesToken(accesToken) {
		try {
			const userData = jwt.verify(accesToken, process.env.ACCESS_TOKEN_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	static async createRefreshSession(userId, refreshToken, fingerprint) {
		const refreshSession = await prisma.refreshSession.create({
			data: {
				userId,
				refreshToken,
				fingerprint,
			},
		})

		return refreshSession
	}

	static async deleteRefreshSession(refreshToken) {
		await prisma.refreshSession.delete({
			where: {
				refreshToken: refreshToken,
			},
		})
	}

	static async findRefreshSession(refreshToken) {
		const tokenData = await prisma.refreshSession.findFirst({
			where: {
				refreshToken: refreshToken,
			},
		})
		return tokenData
	}
}

export default TokenService
