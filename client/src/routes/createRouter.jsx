import { createBrowserRouter } from 'react-router-dom'
import { publicRoutes, adminRoutes, authUserRoutes } from './routes'
import Layout from '../components/layout/Layout'
import { authState } from '../store/store'
import { useState } from 'react'

export function createRouter(isAuth, role) {
	const routes =
		isAuth && role === 2
			? adminRoutes
			: isAuth
			? [...publicRoutes, ...authUserRoutes]
			: publicRoutes

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: routes,
		},
		{
			path: '*',
			element: (
				<div>
					<h2>такой страницы не существует</h2>
				</div>
			),
		},
	])

	return router
}
