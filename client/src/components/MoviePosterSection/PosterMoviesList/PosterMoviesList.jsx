import MovieCard from './MovieCard/MovieCard'
import { memo } from 'react'
import styles from './posterMoviesList.module.css'

const PosterMoviesList = memo(({ posterMovies }) => {
	return (
		<div className={styles.poster__movies__section}>
			{posterMovies.map(movie => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	)
})

export default PosterMoviesList
