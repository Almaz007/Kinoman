import { Router } from 'express';
import AuthController from '../controllers/Auth.js';
import AuthValidator from '../validators/Auth.js';
import AuthMiddleware from '../middlewares/auth-middleware.js';

const router = Router();

router.post('/sign-in', AuthValidator.signIn, AuthController.signIn);
router.post('/sign-up', AuthValidator.signUp, AuthController.signUp);
router.post('/logout', AuthValidator.logOut, AuthController.logOut);
router.get('/activate/:link', AuthController.activate);
router.post('/refresh', AuthValidator.refresh, AuthController.refresh);
router.patch(
	'/updateUserData/:id',
	AuthMiddleware,
	AuthController.updateUserData
);

export default router;
