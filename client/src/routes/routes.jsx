import Profile from '../pages/AdminPages/Profile/Profile';
import Poster from '../pages/PublicPages/Poster/Poster';
import ThankPage from '../pages/PublicPages/ThankPage/ThankPage';
import Movies from '../pages/AdminPages/Movies/Movies';
import Screenings from '../pages/AdminPages/Screenings/Screenings';
import Bookings from '../pages/AdminPages/Bookings/Bookings';
import AdminNews from '../pages/AdminPages/AdminNews/AdminNews';
import MovieSinglePage from '../pages/PublicPages/MovieSinglePage/MovieSinglePage';
import Cinema from '../pages/PublicPages/Cinema/Cinema';
import Contacts from '../pages/PublicPages/Contacts/Contacts';
import MovieAddEdit from '../pages/AdminPages/Movies/MovieAddEdit/MovieAddEdit';
import UserProfile from '../pages/authUserPages/UserProfile/UserProfile';
import Help from '../pages/authUserPages/Help/Help';
import News from '../pages/PublicPages/News/News';
import UserBookings from '../pages/authUserPages/UserBookings/UserBookings';

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
		element: <News />
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
		path: 'MovieAdd',
		element: <MovieAddEdit />
	},
	{
		path: 'Movie/:id/edit',
		element: <MovieAddEdit />
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
		path: 'AdminNews',
		element: <AdminNews />
	}
];

export const authUserRoutes = [
	{
		path: 'userProfile',
		element: <UserProfile />
	},
	{
		path: 'userBookings',
		element: <UserBookings />
	},
	{
		path: 'help',
		element: <Help />
	}
];
