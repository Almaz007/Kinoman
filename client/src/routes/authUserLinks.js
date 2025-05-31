import {
	faPenToSquare,
	faInfo,
	faUser,
	faShop
} from '@fortawesome/free-solid-svg-icons';

export const authUserLinks = [
	{
		id: 1,
		path: 'userProfile',
		text: 'Профиль',
		icon: faUser
	},
	{
		id: 3,
		path: 'userBookings',
		text: 'Заказы',
		icon: faShop
	},
	{
		id: 4,
		path: 'help',
		text: 'Помощь',
		icon: faInfo
	}
];
