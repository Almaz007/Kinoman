import DateList from '../../../../../../components/MoviePosterSection/dateList/DateList'
import { SingleMovieState } from '../../../../../../store/store'
import { useContext, useEffect } from 'react'
import { ContextForSingleMovie } from '../../../MovieSinglePage'
import SceletonList from '../SceletonList/SceletonList'

export default function DateBlock() {
	const { movie, currentDate, setCurrentDate } = useContext(
		ContextForSingleMovie
	)
	const [fetchDate, dateList, isLoadingDate, isErrorDate] = SingleMovieState(
		state => [
			state.fetchDate,
			state.dateList,
			state.isLoadingDate,
			state.isErrorDate,
		]
	)
	useEffect(() => {
		fetchDate(movie.id)
	}, [])

	return isLoadingDate ? (
		<SceletonList
			width={125}
			height={36}
			size={3}
			style={{ marginBottom: '35px', marginTop: '20px' }}
		/>
	) : isErrorDate ? (
		<h2>Произошла ошибка {isErrorDate}</h2>
	) : (
		<DateList
			dateList={dateList}
			selectedDate={currentDate}
			setSelectedDate={setCurrentDate}
		/>
	)
}
