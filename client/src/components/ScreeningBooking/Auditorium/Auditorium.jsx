import styles from './auditorium.module.css';
import { screeningBookingState } from '../../../store/store';
import SeatsList from './SeatsList/SeatsList';
const Auditorium = () => {
	const [stage, auditoriumId, cost] = screeningBookingState(state => [
		state.stage,
		state.screeningBooking.auditoriumId,
		state.screeningBooking.cost
	]);

	return (
		<div
			className={
				stage > 0
					? [styles.noActive, styles.auditorium].join(' ')
					: styles.auditorium
			}
		>
			<h2 className={styles.auditoriumTitle}>{'Зал ' + auditoriumId}</h2>
			<div className={styles.movieScreen}>
				<img src='/images/movie_screen.svg' alt='screen' />
			</div>
			<SeatsList />
			<div className={styles.auditoriumInformation}>
				<div className={styles.auditoriumInformationItem}>
					<div className={[styles.colorBlock, styles.color1].join(' ')}></div>
					<div className={styles.yourPhoisTtext}>Ваш выбор</div>
				</div>
				<div className={styles.auditoriumInformationItem}>
					<div className={[styles.colorBlock, styles.color2].join(' ')}></div>
					<div className={styles.seatPriceText}>{cost + ' ₽'}</div>
				</div>
				<div className={styles.auditoriumInformationItem}>
					<div className={[styles.colorBlock, styles.color3].join(' ')}></div>
					<div className={styles.seatPriceText}>Занято</div>
				</div>

				<div className={styles.clarification}>Цена указана за один билет</div>
			</div>
		</div>
	);
};

export default Auditorium;
