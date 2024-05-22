import styles from './selectedSeatsList.module.css'
import './transitionStyles.css'
import { screeningBookingState } from '../../../../../store/store'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const SelectedSeatsList = ({ selectedSeats, cost }) => {
	const [addAndDeleteSelectedSeats] = screeningBookingState(state => [
		state.addAndDeleteSelectedSeats,
	])

	return (
		<div className={styles.selectedSeatsBlock}>
			<h3 className={styles.selectedSeatsTitle}>Выбранные места</h3>
			<TransitionGroup className={styles.selectedSeats}>
				{selectedSeats.map((seat, index) => (
					<CSSTransition key={seat.id} timeout={300} classNames='seat'>
						<div key={index} className={styles.selectedSeat}>
							<div className={styles.selectedSeatInfo}>
								<div className={styles.seatInfo}>
									{seat.row + ' ряд, ' + seat.number + ' место'}
								</div>
								<div className={styles.priceInfo}>{cost + ' ₽'}</div>
							</div>
							<div
								className={styles.selectedSeatDelete}
								onClick={() => {
									addAndDeleteSelectedSeats(seat)
								}}
							>
								<FontAwesomeIcon
									className={styles.deleteBtn}
									icon={faTrashAlt}
								/>
							</div>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	)
}

export default SelectedSeatsList
