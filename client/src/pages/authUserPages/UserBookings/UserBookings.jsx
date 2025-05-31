import { useEffect } from 'react';
import { authState, useUserBookingsState } from '../../../store/store';
import styles from './userBooking.module.css';
import AuthPageTitle from '../../../components/AuthPageTitle/AuthPageTitle';
import BookingsList from '../../../components/BookingsList/BookingsList';

const UserBookings = () => {
	const { email, id } = authState(state => state.userData);
	const fetchBookings = useUserBookingsState(state => state.fetchBookings);
	useEffect(() => {
		fetchBookings(email, id);
	}, []);
	return (
		<div className={styles['booking']}>
			<AuthPageTitle
				className={styles['title']}
				title='Бронирования пользователя'
			/>
			<BookingsList />
		</div>
	);
};

export default UserBookings;
