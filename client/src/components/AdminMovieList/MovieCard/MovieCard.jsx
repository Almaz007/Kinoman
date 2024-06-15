import styles from './movieCard.module.css';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';

import { moviesState } from '../../../store/store';

const handleDelete = e => {};

const MovieCard = ({ movie }) => {
	const deleteMovie = moviesState(state => state.deleteMovie);
	const { id, title, description } = movie;
	return (
		<div className={styles['movie__card']}>
			<Link to={`/MovieAdd/${id}/edit`}>
				<div className={styles['movie__info']}>
					<h2 className={styles['title']}>{title}</h2>
					<div className={styles['description']}>{description}</div>
				</div>
			</Link>
			<div onClick={() => deleteMovie(id)} className={styles['movie__actions']}>
				<MdDelete className={styles['button']} />
			</div>
		</div>
	);
};

export default MovieCard;
