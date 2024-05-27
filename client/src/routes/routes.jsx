import Profile from '../pages/AdminPages/Profile/Profile';
import Poster from '../pages/PublicPages/Poster/Poster';
import ThankPage from '../pages/PublicPages/ThankPage/ThankPage';
import Movies from '../pages/AdminPages/Movies/Movies';
import Screenings from '../pages/AdminPages/Screenings/Screenings';
import Bookings from '../pages/AdminPages/Bookings/Bookings';
import News from '../pages/AdminPages/News/News';
import TestPage from '../pages/authUserPages/TestPage';
import MovieSinglePage from '../pages/PublicPages/MovieSinglePage/MovieSinglePage';
import Cinema from '../pages/PublicPages/Cinema/Cinema';
import Contacts from '../pages/PublicPages/Contacts/Contacts';

export const publicRoutes = [
	{
		index: true,
		element: <Poster />
	},
	{
		path: 'ThankPage',
		element: <ThankPage />
	},
	{
		path: 'News',
		element: <Poster />
	},
	{
		path: 'NewsPadge',
		element: <Poster />
	},
	{
		path: 'MovieSinglePage/:id',
		element: <MovieSinglePage />
	},
	{
		path: 'Cinema',
		element: <Cinema />
	},
	{
		path: 'Contacts',
		element: <Contacts />
	}
];

export const adminRoutes = [
	{
		index: true,
		element: <Profile />
	},
	{
		path: 'Movies',
		element: <Movies />
	},
	{
		path: 'Screenings',
		element: <Screenings />
	},
	{
		path: 'Bookings',
		element: <Bookings />
	},
	{
		path: 'News',
		element: <News />
	}
];

export const authUserRoutes = [
	{
		path: '/userProfile',
		element: <TestPage />
	},
	{
		path: '/editProfile',
		element: <TestPage />
	},
	{
		path: '/help',
		element: <TestPage />
	}
];
