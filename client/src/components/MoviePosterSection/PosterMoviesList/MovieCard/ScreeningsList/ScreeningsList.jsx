import styles from './screeningList.module.css'
import ScreeningItem from '../screeningItem/ScreeningItem'
import { screeningBookingState } from '../../../../../store/store'
import { contextPosterSection } from '../../../MoviePosterSection'
import { useContext } from 'react'

export default function ScreeningsList({ movie, screenings, setShowModal }) {
	const createScreeningBooking = screeningBookingState(
		state => state.createScreeningBooking
	)

	return (
		<div className={styles.screenings}>
			{screenings.map(screening => (
				<ScreeningItem
					key={screening.id}
					screening={screening}
					handleClick={() => {
						createScreeningBooking(movie, screening)
						setShowModal(true)
					}}
				/>
			))}
		</div>
	)
}
