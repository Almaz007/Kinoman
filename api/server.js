import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Fingerprint from 'express-fingerprint';
import AuthRootRouter from './routers/Auth.js';
import ScreeningsRouter from './routers/ScreeningsRouter.js';
import MoviesRouter from './routers/MoivesRouter.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error-middleware.js';
import SeatsRouter from './routers/SeatsRouter.js';
import PaymentRouter from './routers/PaymentRouter.js';
import FileRouter from './routers/FileRouter.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(
	Fingerprint({
		parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders]
	})
);

app.use('/api/uploads/movieImages', express.static('uploads/movieImages'));
app.use('/api/uploads/ProfileImages', express.static('uploads/profileImages'));

app.use('/api/auth', AuthRootRouter);
app.use('/api/screenings', ScreeningsRouter);
app.use('/api/movies', MoviesRouter);
app.use('/api/seats', SeatsRouter);
app.use('/api/payments', PaymentRouter);
app.use('/api/files', FileRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log('Сервер успешно запущен');
});
