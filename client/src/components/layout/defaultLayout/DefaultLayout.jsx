import Header from '../../UI/header/Header';
import { Outlet } from 'react-router-dom';
import styles from './defaultLayout.module.css';
import Footer from '../../UI/footer/Footer';

export default function DefaultLayout() {
	return (
		<>
			<Header />
			<main className={styles['main']}>
				<div className='container'>
					<Outlet />
				</div>
			</main>
			<Footer />
		</>
	);
}
