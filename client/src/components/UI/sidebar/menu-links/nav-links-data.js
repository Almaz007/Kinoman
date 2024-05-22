import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faVideo,
	faCalendar,
	faTicket,
	faNewspaper,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
export const NavLinksData = [
	{
		id: 1,
		path: '/',
		text: 'Кабинет',
		icon: faUser,
	},
	{
		id: 2,
		path: '/Movies',
		text: 'Фильмы',
		icon: faVideo,
	},
	{
		id: 3,
		path: '/Screenings',
		text: 'Сеансы',
		icon: faCalendar,
	},
	{
		id: 4,
		path: '/Bookings',
		text: 'Бронирования',
		icon: faTicket,
	},
	{
		id: 5,
		path: '/News',
		text: 'Новости',
		icon: faNewspaper,
	},
]
