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
import MovieAdd from '../pages/AdminPages/Movies/MovieAdd/MovieAdd';
import UserProfile from '../pages/authUserPages/UserProfile/UserProfile';
import EditProfile from '../pages/authUserPages/EditProfile/EditProfile';
import Help from '../pages/authUserPages/Help/Help';
import News from '../pages/PublicPages/News/News';
import Orders from '../pages/authUserPages/Orders/Orders';

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
		path: 'MovieAdd',
		element: <MovieAdd />
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
		path: 'editProfile',
		element: <EditProfile />
	},
	{
		path: 'orders',
		element: <Orders />
	},
	{
		path: 'help',
		element: <Help />
	}
];
