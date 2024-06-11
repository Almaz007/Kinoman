import styles from './movieFullInfo.module.css';

const MovieFullInfo = ({ movie, months }) => {
	console.log(movie);
	return (
		<div className={styles.movie__fullInfo}>
			<div className={styles.movie__desc}>{movie.description}</div>
			<div className={styles.column}>
				<div className={styles.info__block}>
					<div className={styles.info__title}>Режисер</div>
					<div className={styles.info__text}>{movie.directore}</div>
				</div>
				{/* <div className={styles.info__block}>
					<div className={styles.info__title}>Сценарий</div>
					<div className={styles.info__text}></div>
				</div> */}
			</div>
			<div className={styles.column}>
				<div className={styles.info__block}>
					<div className={styles.info__title}>Продолжительность</div>
					<div className={styles.info__text}>
						{Math.floor(movie.duration / 60) +
							' ч' +
							' ' +
							(movie.duration % 60) +
							' м'}
					</div>
				</div>
				<div className={styles.info__block}>
					<div className={styles.info__title}>Год выпуска</div>
					<div className={styles.info__text}>
						{movie.releaseDate.split('-')[0]}
					</div>
				</div>
				<div className={styles.info__block}>
					<div className={styles.info__title}>Дата выхода</div>
					<div className={styles.info__text}>
						{'с ' +
							movie.releaseDate.split('-')[2].slice(0, 2) +
							' ' +
							months[+movie.releaseDate.split('-')[1]]}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieFullInfo;
