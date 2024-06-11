import styles from './movieSingleCard.module.css';
import MovieDetails from './MovieDetails/MovieDetails';
import Shedule from './Schedule/Schedule';
import cn from 'classnames';

export default function MovieSingleCard({ imgSrc, className }) {
	return (
		<div className={cn(styles['movie__single__card'], className)}>
			<div className={styles['movie__img']}>
				<img src={imgSrc} alt='posterLink' />
			</div>
			<div className={styles['movie__info']}>
				<MovieDetails />
				<Shedule />
			</div>
		</div>
	);
}
