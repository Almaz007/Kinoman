import styles from './prevLink.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function PrevLink() {
	const navigate = useNavigate()
	return (
		<div className={styles['prev__link']} onClick={() => navigate(-1)}>
			<button className={styles['prev__link__btn']}>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<div className={styles['prev__link__text']}>Все фильмы</div>
		</div>
	)
}
