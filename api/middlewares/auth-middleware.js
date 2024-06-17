import { WebError, Unauthorized, Forbidden } from '../utils/Errors.js';
import TokenService from '../services/Token.js';

export default function authMiddleware(req, res, next) {
	try {
		const authHeader = req.headers.authorization;
		const accessToken = authHeader?.split(' ')?.[1];

		if (!accessToken) {
			return next(new Unauthorized('Вы не авторизованы'));
		}
		const userData = TokenService.verifyAccesToken(accessToken);
		if (!userData) {
			return next(new Forbidden('Вы не авторизованы'));
		}

		req.user = userData;
		next();
	} catch (err) {
		return next(err);
	}
}
