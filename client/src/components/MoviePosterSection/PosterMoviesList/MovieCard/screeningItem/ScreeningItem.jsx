import styles from './screeningItem.module.css'
import getTimeTheDate from '../../../../../utils/getTimeTheDate'

const ScreeningItem = ({ screening, handleClick }) => {
	return (
		<div className={styles.screening} onClick={handleClick}>
			<div className={styles.screening__time}>
				{getTimeTheDate(screening.screeningStart)}
			</div>
			<div className={styles.screening__price}>{screening.cost + ' р'}</div>
			<div className={styles.screening__quality}>{screening.quality}</div>
		</div>
	)
}

export default ScreeningItem
