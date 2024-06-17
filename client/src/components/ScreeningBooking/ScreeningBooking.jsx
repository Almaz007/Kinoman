import { useEffect } from 'react';
import { authState, screeningBookingState } from '../../store/store';
import BookingStages from './BokingStages/BookingStages';
import Auditorium from './Auditorium/Auditorium';
import Loader from '../UI/loader/Loader';
import styles from './screeningBooking.module.css';

const ScreeningBooking = () => {
	const userData = authState(state => state.userData);
	const [fetchSeatsInfo, firstRender, updateFirstRender, isLoading, isError] =
		screeningBookingState(state => [
			state.fetchSeatsInfo,
			state.firstRender,
			state.updateFirstRender,
			state.isLoading,
			state.isError
		]);

	useEffect(() => {
		if (firstRender) {
			fetchSeatsInfo();
			updateFirstRender(false);
		}
	}, []);

	return (
		<div className={styles.screeningBooking}>
			{isLoading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : isError ? (
				<p>произошла ошикба {isError}</p>
			) : (
				<div className={styles.mainBlock}>
					<BookingStages />
					<Auditorium />
				</div>
			)}
		</div>
	);
};
export default ScreeningBooking;
