import { Link } from 'react-router-dom';
import AuthPageTitle from '../../../components/AuthPageTitle/AuthPageTitle';
import MyButton from '../../../components/UI/button/MyButton';
import styles from './movies.module.css';
import AdminMovieList from '../../../components/AdminMovieList/AdminMovieList';

export default function Movies() {
	return (
		<div>
			<AuthPageTitle title='Фильмы' className={styles['title']} />

			<Link to='/MovieAdd'>
				<MyButton className={styles['button']}>Добавить</MyButton>
			</Link>

			<AdminMovieList />
		</div>
	);
}
