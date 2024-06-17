import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes, adminRoutes, authUserRoutes } from './routes';
import Layout from '../components/layout/Layout';
import SignupResult from '../pages/PublicPages/SignupResult/SuccesResult';
import ErrorResult from '../pages/PublicPages/SignupResult/ErrorResult';
import SuccesResult from '../pages/PublicPages/SignupResult/SuccesResult';

export function createRouter(isAuth, role) {
	const routes =
		isAuth && role === 2
			? adminRoutes
			: isAuth
			? [...publicRoutes, ...authUserRoutes]
			: publicRoutes;

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: routes
		},
		{
			path: '/SuccesResult',
			element: <SuccesResult />
		},

		{
			path: '/ErrorResult',
			element: <ErrorResult />
		},

		{
			path: '*',
			element: (
				<div>
					<h2>такой страницы не существует</h2>
				</div>
			)
		}
	]);

	return router;
}
