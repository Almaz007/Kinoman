import styles from './schedule.module.css'

import DateBlock from './DateBlock/DateBlock'
import ScreeningBlock from './ScreeningsBlock/ScreeningBlock'

export default function Schedule() {
	return (
		<div className={styles['movie__screenings']}>
			<DateBlock />
			<ScreeningBlock />
		</div>
	)
}
