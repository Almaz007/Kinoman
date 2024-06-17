import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import TokenService from './Token.js';
import {
	NotFound,
	Forbidden,
	Conflict,
	Unauthorized
} from '../utils/Errors.js';
import { ACCESS_TOKEN_EXPIRATION } from '../constants.js';
import prisma from '../db/db.config.js';
import UserDto from '../dtos/userDto.js';
import MailService from './MailService.js';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';

class AuthService {
	static async signIn({ email, password, fingerprint }) {
		const userData = await prisma.user.findFirst({
			where: {
				email: email
			}
		});
		if (!userData) {
			throw new Conflict('Пользовтаель с таким email не найден');
		}
		if (!userData.isActivated) {
			throw new Conflict('Подтвердите аккаунт по ссылке, полученной на почту');
		}

		const isPasswordValid = bcrypt.compareSync(password, userData.password);
		if (!isPasswordValid) {
			throw new Unauthorized('Неверный логин или пароль');
		}

		const userDto = new UserDto(userData);
		const accesToken = TokenService.generateAccessToken({ ...userDto });
		const refreshToken = TokenService.generateRefreshToken({ ...userDto });

		await TokenService.createRefreshSession(
			userDto.id,
			refreshToken,
			fingerprint.hash
		);

		return {
			accesToken,
			refreshToken,
			userDto,
			accesTokenExpiration: ACCESS_TOKEN_EXPIRATION
		};
	}

	static async signUp({ userName, email, phoneNumber, password, fingerprint }) {
		const userData = await prisma.user.findUnique({
			where: {
				email: email
			}
		});

		if (userData) {
			throw new Conflict('Пользовтаель с таким email уже существует');
		}

		const hashedPassword = bcrypt.hashSync(password, 8);

		const newUser = await prisma.user.create({
			data: {
				userName,
				email,
				password: hashedPassword,
				phoneNumber,
				roleId: 1,
				isActivated: false
			}
		});

		const activationLink = uuidv4(); // v34fa-asfasf-142saf-sa-asf
		await MailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/auth/activate/${activationLink}`
		);

		await prisma.activationLink.create({
			data: {
				userId: newUser.id,
				link: activationLink
			}
		});

		// const userDto = new UserDto(newUser);
		// const accesToken = TokenService.generateAccessToken({ ...userDto });
		// const refreshToken = TokenService.generateRefreshToken({ ...userDto });

		// await TokenService.createRefreshSession(
		// 	userDto.id,
		// 	refreshToken,
		// 	fingerprint.hash
		// );

		// return {
		// 	accesToken,
		// 	refreshToken,
		// 	userDto,
		// 	accesTokenExpiration: ACCESS_TOKEN_EXPIRATION
		// };
	}

	static async logOut(refreshToken) {
		await TokenService.deleteRefreshSession(refreshToken);
	}

	static async refresh({ fingerprint, currentRefreshToken }) {
		if (!currentRefreshToken || currentRefreshToken === 'undefined') {
			throw new Unauthorized('Вы не авторизованы');
		}

		const refreshSession = await TokenService.findRefreshSession(
			currentRefreshToken
		);
		if (!refreshSession) {
			return new Unauthorized();
		}

		if (fingerprint.hash !== refreshSession.fingerprint) {
			throw new Forbidden();
		}

		await TokenService.deleteRefreshSession(currentRefreshToken);

		let payload = TokenService.verifyRefreshToken(currentRefreshToken);
		if (!payload) {
			throw new Forbidden('Не правильный рефреш токен');
		}

		const userData = await prisma.user.findUnique({
			where: {
				email: payload.email
			}
		});

		const userDto = new UserDto(userData);

		const accesToken = TokenService.generateAccessToken({ ...userDto });
		const refreshToken = TokenService.generateRefreshToken({ ...userDto });

		await TokenService.createRefreshSession(
			userDto.id,
			refreshToken,
			fingerprint.hash
		);

		return {
			accesToken,
			refreshToken,
			userDto,
			accesTokenExpiration: ACCESS_TOKEN_EXPIRATION
		};
	}
	static async activate(activationLink) {
		console.log(activationLink);
		const link = await prisma.activationLink.findFirst({
			where: {
				link: activationLink
			}
		});
		if (!link) {
			throw new Conflict('Неккоректная ссылка активации');
		}

		const user = await prisma.user.update({
			where: {
				id: link.userId
			},
			data: {
				isActivated: true
			}
		});

		await prisma.activationLink.delete({
			where: {
				id: link.id
			}
		});
	}
	static async updateUserData({
		fingerprint,
		currentRefreshToken,
		userId,
		userData: newUserData
	}) {
		if (!currentRefreshToken || currentRefreshToken === 'undefined') {
			throw new Unauthorized('Вы не авторизованы');
		}

		const refreshSession = await TokenService.findRefreshSession(
			currentRefreshToken
		);
		if (!refreshSession) {
			return new Unauthorized();
		}

		if (fingerprint.hash !== refreshSession.fingerprint) {
			throw new Forbidden();
		}

		const user = await prisma.user.findFirst({
			where: {
				NOT: {
					id: userId
				},
				email: newUserData.email
			}
		});

		if (user) {
			throw new Conflict('Пользовтаель с таким email уже существует');
		}

		await TokenService.deleteRefreshSession(currentRefreshToken);

		let payload = TokenService.verifyRefreshToken(currentRefreshToken);
		if (!payload) {
			throw new Forbidden('Не правильный рефреш токен');
		}
		if (newUserData['password'])
			newUserData['password'] = bcrypt.hashSync(newUserData['password'], 8);

		const userData = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				...newUserData
			}
		});
		const userDto = new UserDto(userData);

		const accesToken = TokenService.generateAccessToken({ ...userDto });
		const refreshToken = TokenService.generateRefreshToken({ ...userDto });

		await TokenService.createRefreshSession(
			userDto.id,
			refreshToken,
			fingerprint.hash
		);

		return {
			accesToken,
			refreshToken,
			userDto,
			accesTokenExpiration: ACCESS_TOKEN_EXPIRATION
		};
	}
}

export default AuthService;
