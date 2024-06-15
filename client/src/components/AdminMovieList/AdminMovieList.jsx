import { useEffect } from 'react';
import { moviesState } from '../../store/store';
import styles from './admin.module.css';
import MovieCard from './MovieCard/MovieCard';

const AdminMovieList = () => {
	const [getAllMovies, movies] = moviesState(state => [
		state.getAllMovies,
		state.movies
	]);

	useEffect(() => {
		getAllMovies();
	}, []);

	return (
		<div className={styles['movieList']}>
			{movies.map(movie => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	);
};

export default AdminMovieList;
