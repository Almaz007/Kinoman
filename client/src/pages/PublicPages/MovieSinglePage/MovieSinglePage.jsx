import { useLocation } from 'react-router-dom';
import { createContext, useState } from 'react';

import styles from './movieSinglePage.module.css';
import MovieSingleCard from './MovieSingleCard/MovieSingleCard';
import MovieDescription from './MovieDescription/MovieDescription';
import PrevLink from '../../../components/PrevLink/PrevLink';
import ScreeningBooking from '../../../components/ScreeningBooking/ScreeningBooking';
import MyModal from '../../../components/UI/MyModal/MyModal';

export const ContextForSingleMovie = createContext();

export default function MovieSinglePage() {
	const location = useLocation();
	const { movie, selectedDate } = location?.state;

	const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<ContextForSingleMovie.Provider
				value={{ movie, currentDate, setCurrentDate, showModal, setShowModal }}
			>
				<div className={styles['movie__single__page']}>
					<PrevLink text='Все фильмы' className={styles['prev__link']} />
					<MovieSingleCard
						imgSrc={movie.posterLink}
						className={styles['single__card']}
					/>
					<MovieDescription movie={movie} />
				</div>
			</ContextForSingleMovie.Provider>
			<MyModal visible={showModal} setVisible={setShowModal}>
				<ScreeningBooking />
			</MyModal>
		</>
	);
}
