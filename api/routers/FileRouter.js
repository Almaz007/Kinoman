import express from 'express';
import { Router } from 'express';
import profileFilesMiddleware from '../middlewares/profileFiles-middleware.js';
import movieFilesMiddleware from '../middlewares/movieFiles-middleware.js';

const router = Router();

router.post(
	'/upload/movieImg',
	movieFilesMiddleware.single('image'),
	(req, res) => {
		try {
			res.json({
				url: `/uploads/movieImages/${req.file.filename}`
			});
		} catch (err) {
			console.log(err);
		}
	}
);

router.post(
	'/upload/profileImg',
	profileFilesMiddleware.single('image'),
	(req, res) => {
		try {
			res.json({
				url: `/uploads/profileImages/${req.file.filename}`
			});
		} catch (err) {
			next(err);
		}
	}
);

// router.get('/uploads', express.static('uploads'));
export default router;
