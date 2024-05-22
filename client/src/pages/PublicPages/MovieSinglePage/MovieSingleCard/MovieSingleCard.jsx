import styles from './movieSingleCard.module.css'
import MovieDetails from './MovieDetails/MovieDetails'
import Shedule from './Schedule/Schedule'

export default function MovieSingleCard({ imgSrc }) {
	return (
		<div className={styles['movie__single__card']}>
			<div className={styles['movie__img']}>
				<img src={imgSrc} alt='posterLink' />
			</div>
			<div className={styles['movie__info']}>
				<MovieDetails />
				<Shedule />
			</div>
		</div>
	)
}
