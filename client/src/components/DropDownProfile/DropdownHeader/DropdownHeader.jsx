import { authState } from '../../../store/store';
import styles from './dropdownHeader.module.css';

export default function DropdownHeader() {
	const { email, userName, posterLink } = authState(state => state.userData);
	return (
		<div className={styles['dropdown-header']}>
			<div className={styles['header-image']}>
				{posterLink && (
					<img className={styles['image']} src={posterLink} alt='avatar' />
				)}
			</div>
			<div className={styles['header-text']}>
				<div className={styles['user-name']}>{userName}</div>
				<div className={styles['user-email']}>{email}</div>
			</div>
		</div>
	);
}
