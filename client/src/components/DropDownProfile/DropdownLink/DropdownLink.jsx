import styles from './dropdownLink.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useMatch } from 'react-router-dom';
export default function DropdownLink({ path, text, icon, handleClick }) {
	const match = useMatch(path ?? 'none');

	return (
		<li className={styles['list-item']}>
			<Link
				to={path ?? '#'}
				className={
					match
						? [styles['nav-link'], styles['active']].join(' ')
						: styles['nav-link']
				}
				onClick={handleClick}
			>
				<div className={styles['link-icon']}>
					<FontAwesomeIcon icon={icon} />
				</div>
				<div className={styles['linkName']}>{text}</div>
			</Link>
		</li>
	);
}
