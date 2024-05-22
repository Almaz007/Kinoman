import styles from './movieDetails.module.css'
import { useContext } from 'react'
import { ContextForSingleMovie } from '../../MovieSinglePage'
import {
	getDayMont,
	getHourMinutesByTime,
} from '../../../../../utils/getDayNumMonthByFullDate'

export default function MovieDetails() {
	const { movie } = useContext(ContextForSingleMovie)
	const { title, country, releaseDate, duration } = movie

	return (
		<div className={styles['movie__details']}>
			<h2 className={styles['movie__title']}>{title}</h2>
			<div className={styles['movie__subdetails']}>
				<div className={styles['movie__genre']}>Драма, Комедия</div>
				<div className={styles['movie__country__date']}>
					{`${country}, ${new Date(releaseDate).getFullYear()}`}
				</div>
				<div className={styles['date__time']}>
					<div className={styles['date__time__item']}>
						c {getDayMont(releaseDate)}
					</div>
					<div className={styles['date__time__item']}>
						{getHourMinutesByTime(duration)}
					</div>
				</div>
			</div>
		</div>
	)
}
