import { screeningBookingState } from '../../../../store/store'
import SeatsRow from './SeatsRow/SeatsRow'
import styles from './SeatsList.module.css'

const SeatsList = () => {
	const seatsInfo = screeningBookingState(state => state.seatsInfo)
	return (
		<div className={styles.seats}>
			{seatsInfo
				? seatsInfo.map((seatsRow, index) => (
						<SeatsRow key={seatsRow[0].row} seatsRow={seatsRow} />
				  ))
				: 'Пусто'}
		</div>
	)
}

export default SeatsList
