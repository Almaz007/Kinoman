import { useContext } from 'react';
import styles from './movieCard.module.css';
import { PosterMoviesState } from '../../../../store/store';
import { contextPosterSection } from '../../MoviePosterSection';
import { useNavigate } from 'react-router-dom';
import ScreeningsList from './ScreeningsList/ScreeningsList';

const MovieCard = ({ movie }) => {
	const { posterLink, title, screenings, genres } = movie;
	const { setShowModal } = useContext(contextPosterSection);
	const selectedDate = PosterMoviesState(state => state.selectedDate);
	console.log(selectedDate);
	const navigate = useNavigate();

	return (
		<div className={styles.movie__card}>
			<div
				className={styles.movie__img}
				onClick={() =>
					navigate(`/MovieSinglePage/${movie.id}`, {
						state: {
							movie,
							selectedDate
						}
					})
				}
			>
				<img src={posterLink} alt='movie' />
			</div>
			<div className={styles.movie__info}>
				<h2 className={styles.movie__name}>{title}</h2>
				<div className={styles.genres}>
					{genres.map(({ genre }) => (
						<div key={genre.name} className={styles.genre}>
							{genre.name}
						</div>
					))}
				</div>

				<ScreeningsList
					screenings={screenings}
					movie={movie}
					setShowModal={setShowModal}
				/>
			</div>
		</div>
	);
};

export default MovieCard;
