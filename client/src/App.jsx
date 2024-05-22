import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { authState } from './store/store';
import { createRouter } from './routes/createRouter';
import Loader from './components/UI/loader/Loader';

const App = () => {
	const [isLoading, checkAuth, isAuth, role] = authState(state => [
		state.isLoading,
		state.handleCheckAuth,
		state.isAuth,
		state.userData.roleId
	]);

	useEffect(() => {
		checkAuth();
	}, []);

	if (isLoading) {
		return (
			<div style={{ height: '100svh' }}>
				<Loader />
			</div>
		);
	}

	const router = createRouter(isAuth, role);

	return <RouterProvider router={router} />;
};

export default App;
