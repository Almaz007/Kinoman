import Seat from './Seat/Seat'
import styles from './seatsRow.module.css'

const SeatsRow = ({ seatsRow }) => {
	return (
		<div className={styles.seatsRow}>
			<div className={styles.numRow}>{seatsRow[0].row}</div>
			{seatsRow.map(seat => (
				<Seat key={seat.id} seat={seat} />
			))}
			<div className={styles.numRow}>{seatsRow[0].row}</div>
		</div>
	)
}

export default SeatsRow
