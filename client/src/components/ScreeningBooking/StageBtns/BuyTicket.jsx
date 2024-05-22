import styles from './stageBtns.module.css'
import { screeningBookingState } from '../../../store/store'

const BuyTicket = () => {
	const [stage, cost, seatsCount, incStage] = screeningBookingState(state => [
		state.stage,
		state.screeningBooking.cost,
		state.selectedSeats.length,
		state.incStage,
	])
	return (
		<>
			<div
				className={
					seatsCount !== 0
						? styles.payBtn
						: [styles.noActive, styles.payBtn].join(' ')
				}
				onClick={() => {
					incStage()
				}}
			>
				Купить билет
			</div>
			<div className={styles.resultCostInfo}>
				<div className={styles.resultCostText}>Итого</div>
				<div className={styles.resultCost}>{seatsCount * cost + ' ₽'}</div>
			</div>
		</>
	)
}

export default BuyTicket
