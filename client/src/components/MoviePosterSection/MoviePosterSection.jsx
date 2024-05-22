import { useEffect, useState, createContext } from 'react'
import DateList from './dateList/DateList'
import PosterMoviesList from './PosterMoviesList/PosterMoviesList'
import MyModal from '../UI/MyModal/MyModal'
import MovieSceletonBlock from './MovieSceletonBlock/MovieSceletonBlock'
import styles from './moviePosterSection.module.css'
import { PosterMoviesState } from '../../store/store'
import ScreeningBooking from '../ScreeningBooking/ScreeningBooking'
import { authState } from '../../store/store'

export const contextPosterSection = createContext()

const MoviePosterSection = () => {
	const [selectedDate, updateSelectedDate, generateDateList] =
		PosterMoviesState(state => [
			state.selectedDate,
			state.updateSelectedDate,
			state.generateDateList,
		])

	const [dateList, setDateList] = useState(() => generateDateList())

	const [posterMovies, isLoading, isError, fetchPosterMovies] =
		PosterMoviesState(state => [
			state.posterMovies,
			state.isLoading,
			state.isError,
			state.fetchPosterMovies,
		])

	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		if (!selectedDate) {
			updateSelectedDate(dateList[0])
		}
	}, [])

	useEffect(() => {
		if (selectedDate) {
			fetchPosterMovies(selectedDate)
		}
	}, [selectedDate])

	return (
		<div className={styles.poster__movies__section}>
			<DateList
				dateList={dateList}
				selectedDate={selectedDate}
				setSelectedDate={updateSelectedDate}
			/>
			{isLoading ? (
				<MovieSceletonBlock />
			) : isError ? (
				<h2>Произошла ошибка {isError}</h2>
			) : (
				<contextPosterSection.Provider value={{ setShowModal }}>
					<PosterMoviesList posterMovies={posterMovies} />
				</contextPosterSection.Provider>
			)}

			<MyModal visible={showModal} setVisible={setShowModal}>
				<ScreeningBooking />
			</MyModal>
		</div>
	)

	return <div>hello</div>
}

export default MoviePosterSection
