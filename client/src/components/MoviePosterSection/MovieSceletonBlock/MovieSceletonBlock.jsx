import MoviePosterSceleton from '../../UI/MoviePosterSceleton/MoviePosterSceleton'
import styles from './moiveSceletonBlock.module.css'

const MovieSceletonBlock = () => {
	return (
		<div className={styles.sceleton__block}>
			{[...new Array(4)].map((sceleton, index) => (
				<MoviePosterSceleton key={index} />
			))}
		</div>
	)
}

export default MovieSceletonBlock
