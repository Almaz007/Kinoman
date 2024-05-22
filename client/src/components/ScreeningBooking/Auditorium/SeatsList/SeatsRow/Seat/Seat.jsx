import { screeningBookingState } from '../../../../../../store/store'
import styles from './Seat.module.css'

const Seat = ({ seat }) => {
	const [selectedSeats, addAndDeleteSelectedSeats] = screeningBookingState(
		state => [state.selectedSeats, state.addAndDeleteSelectedSeats]
	)
	return seat.reserved ? (
		<div className={[styles.reservedSeat, styles.seat].join(' ')}>
			{seat.number}
		</div>
	) : (
		<div
			className={
				selectedSeats.find(selectedSeat => selectedSeat.id === seat.id)
					? [styles.selected, styles.seat].join(' ')
					: styles.seat
			}
			onClick={() => {
				addAndDeleteSelectedSeats(seat)
			}}
		>
			{seat.number}
		</div>
	)
}

export default Seat
