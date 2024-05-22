import ScreeningsList from '../../../../../../components/MoviePosterSection/PosterMoviesList/MovieCard/ScreeningsList/ScreeningsList'
import { SingleMovieState } from '../../../../../../store/store'
import { ContextForSingleMovie } from '../../../MovieSinglePage'
import { useContext, useEffect } from 'react'
import SceletonList from '../SceletonList/SceletonList'

export default function ScreeningBlock() {
	const { movie, currentDate, setShowModal } = useContext(ContextForSingleMovie)
	const [
		fetchScreenings,
		screeningsByDate,
		isLoadingScreenings,
		isErrorScreenings,
	] = SingleMovieState(state => [
		state.fetchScreenings,
		state.screeningsByDate,
		state.isLoadingScreenings,
		state.isErrorScreenings,
	])

	useEffect(() => {
		const abortController = new AbortController()
		if (currentDate) {
			fetchScreenings(currentDate, movie.id, abortController)
		}

		return () => {
			abortController.abort()
		}
	}, [currentDate, movie.id])

	return isLoadingScreenings ? (
		<SceletonList width={80} height={70} size={3} style={{}} />
	) : isErrorScreenings ? (
		<h2>Произошла ошибка {isErrorScreenings}</h2>
	) : (
		<ScreeningsList
			screenings={screeningsByDate}
			movie={movie}
			setShowModal={setShowModal}
		/>
	)
}
