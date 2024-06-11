import { WebError } from '../utils/Errors.js';

export default function errorMiddleware(err, req, res, next) {
	console.log(err);
	// console.log("hellooooo i'm middleware")
	if (err instanceof WebError) {
		return res.status(err.status).json(err);
	}
	return res.status(500).json({
		message: 'Непредвиденная ошибка',
		errName: err.name,
		errMessage: err.message
	});
}
