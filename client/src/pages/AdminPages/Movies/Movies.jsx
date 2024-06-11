import { Link } from 'react-router-dom';
import AdminPageTitle from '../../../components/AdminPageTitle/AdminPageTitle';
import MyButton from '../../../components/UI/button/MyButton';
import styles from './movies.module.css';

export default function Movies() {
	return (
		<div>
			<AdminPageTitle title='Фильмы' className={styles['title']} />
			<Link to='/MovieAdd'>
				<MyButton className={styles['button']}>Добавить</MyButton>
			</Link>
		</div>
	);
}
