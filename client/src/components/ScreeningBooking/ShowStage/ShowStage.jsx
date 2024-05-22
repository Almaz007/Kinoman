import styles from './ShowStage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faShoppingCart,
	faSearch,
	faKeyboard,
} from '@fortawesome/free-solid-svg-icons'

const ShowStage = ({ stage }) => {
	const stages = [
		{
			text: 'Выбор места',
			icon: <FontAwesomeIcon className={styles.faIcon} icon={faSearch} />,
		},
		{
			text: 'Ввод данных',
			icon: <FontAwesomeIcon className={styles.faIcon} icon={faKeyboard} />,
		},
		{
			text: 'Оплата',
			icon: <FontAwesomeIcon className={styles.faIcon} icon={faShoppingCart} />,
		},
	]

	return (
		<div className={styles.bookingStages}>
			{stages.map((currentStage, index) => (
				<div
					key={index}
					className={
						stage == index
							? [styles.activeStage, styles.stage].join(' ')
							: stage > index
							? [styles.prevStage, styles.stage].join(' ')
							: styles.stage
					}
				>
					<div className={styles.stageIcon}>{currentStage.icon}</div>
					<div className={styles.stageText}>{currentStage.text}</div>
				</div>
			))}
		</div>
	)
}

export default ShowStage
