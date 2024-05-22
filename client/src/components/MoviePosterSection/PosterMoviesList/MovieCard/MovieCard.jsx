import { useContext } from 'react'
import styles from './movieCard.module.css'
import ScreeningItem from './screeningItem/ScreeningItem'
import {
	PosterMoviesState,
	screeningBookingState,
} from '../../../../store/store'
import { contextPosterSection } from '../../MoviePosterSection'
import { useNavigate } from 'react-router-dom'
import ScreeningsList from './ScreeningsList/ScreeningsList'

const MovieCard = ({ movie }) => {
	const { posterLink, title, screenings } = movie
	const { setShowModal } = useContext(contextPosterSection)
	const selectedDate = PosterMoviesState(state => state.selectedDate)

	const navigate = useNavigate()

	return (
		<div className={styles.moview__card}>
			<div
				className={styles.movie__img}
				onClick={() =>
					navigate(`/MovieSinglePage/${movie.id}`, {
						state: {
							movie,
							selectedDate,
						},
					})
				}
			>
				<img src={posterLink} alt='movie' />
			</div>
			<div className={styles.movie__info}>
				<h2 className={styles.movie__name}>{title}</h2>
				<div className={styles.genres}>
					<div className={styles.genre}>"Комедия"</div>
					<div className={styles.genre}>"Приключения"</div>
					<div className={styles.genre}>"Фэнтези"</div>
				</div>

				<ScreeningsList
					screenings={screenings}
					movie={movie}
					setShowModal={setShowModal}
				/>
			</div>
		</div>
	)
}

export default MovieCard
