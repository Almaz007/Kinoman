import styles from './movieCard.module.css';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { moviesState } from '../../../store/store';
import Swal from 'sweetalert2';

const MovieCard = ({ movie }) => {
	const deleteMovie = moviesState(state => state.deleteMovie);
	const { id, title, description } = movie;

	const handleDelete = async () => {
		const result = await Swal.fire({
			title: 'Вы точно хотите удалить запись?',
			showCancelButton: true,
			confirmButtonText: 'Удалить',
			cancelButtonText: 'Отмена',
			confirmButtonColor: '#d33',
			cancelButtonColor: '#ccc',
			showLoaderOnConfirm: true,
			preConfirm: async () => await deleteMovie(id, Swal),
			allowOutsideClick: () => !Swal.isLoading()
		});
		if (result.isConfirmed) {
			Swal.fire({
				title: 'Удалено!',
				confirmButtonColor: '#0030e2',
				icon: 'success'
			});
		}
	};

	return (
		<div className={styles['movie__card']}>
			<Link to={`/Movie/${id}/edit`}>
				<div className={styles['movie__info']}>
					<h2 className={styles['title']}>{title}</h2>
					<div className={styles['description']}>{description}</div>
				</div>
			</Link>
			<div onClick={() => handleDelete()} className={styles['movie__actions']}>
				<MdDelete className={styles['button']} />
			</div>
		</div>
	);
};

export default MovieCard;
