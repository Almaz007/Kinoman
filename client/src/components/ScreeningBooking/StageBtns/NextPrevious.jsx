import styles from './stageBtns.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { screeningBookingState } from '../../../store/store'

const NextPrevious = ({ handleclick }) => {
	const [stage, decStage, chequeSendInfo] = screeningBookingState(state => [
		state.stage,
		state.decStage,
		state.chequeSendInfo,
	])

	const { email, phoneNumber } = chequeSendInfo
	return (
		<>
			<div className={styles.prevBtn} onClick={() => decStage()}>
				<FontAwesomeIcon className={styles.icon} icon={faChevronLeft} />
			</div>
			<div
				className={
					stage === 1
						? !email || !phoneNumber
							? [styles.noActvie, styles.nextBtn].join(' ')
							: styles.nextBtn
						: styles.nextBtn
				}
				onClick={() => {
					handleclick()
				}}
			>
				{stage === 2 ? 'Оплатить' : 'Продолжить'}
			</div>
		</>
	)
}

export default NextPrevious
