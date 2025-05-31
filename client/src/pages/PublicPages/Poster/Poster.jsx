import MoviePosterSection from '../../../components/MoviePosterSection/MoviePosterSection';
import styles from './poster.module.css';
const Poster = () => {
	return (
		<div className={styles['poster']}>
			<h2 className={styles['title']}>Афиша</h2>
			<MoviePosterSection />
		</div>
	);
};

export default Poster;
