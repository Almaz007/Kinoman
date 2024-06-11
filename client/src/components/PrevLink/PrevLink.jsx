import styles from './prevLink.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

export default function PrevLink({ text, className }) {
	const navigate = useNavigate();
	return (
		<div
			className={cn(styles['prev__link'], className)}
			onClick={() => navigate(-1)}
		>
			<button className={styles['prev__link__btn']}>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<div className={styles['prev__link__text']}>{text}</div>
		</div>
	);
}
