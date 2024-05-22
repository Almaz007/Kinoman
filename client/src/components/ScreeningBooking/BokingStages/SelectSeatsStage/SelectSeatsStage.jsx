import styles from './selectSeatsStage.module.css'
import { screeningBookingState } from '../../../../store/store'
import SelectedSeatsList from './SelectedSeatsList/SelectedSeatsList'

const SelectSeatsStage = () => {
	const [screeningBooking, selectedSeats] = screeningBookingState(state => [
		state.screeningBooking,
		state.selectedSeats,
	])

	const { title, duration, rating, cost, auditoriumId, quality } =
		screeningBooking
	return (
		<div className={styles.selectSeatsStage}>
			<div className={styles.movieInfo}>
				<div className={styles.title}>{title}</div>
				<div className={styles.duration}>
					<div className={styles.durationTitle}>длительность</div>
					<div className={styles.durationValue}>{duration} мин</div>
				</div>
				<div className={styles.subInfo}>
					<div className={styles.subDataElem}>{rating}</div>
					<div className={styles.subDataElem}>{quality}</div>
					<div className={styles.subDataElem}>Зал {auditoriumId}</div>
				</div>
			</div>
			<SelectedSeatsList cost={cost} selectedSeats={selectedSeats} />
		</div>
	)
}

export default SelectSeatsStage
