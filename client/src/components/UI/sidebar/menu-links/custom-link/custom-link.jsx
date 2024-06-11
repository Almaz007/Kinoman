import { Link, useMatch } from 'react-router-dom';

import styles from './custom-link.module.css';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextForAdminLayout } from '../../../../layout/adminLayout/AdminLayout';

export default function CustomLink({ path, text, icon, handleClick }) {
	const { sidebarVisible } = useContext(ContextForAdminLayout);
	const match = useMatch(path ?? 'none');
	return (
		<li
			className={
				sidebarVisible
					? styles['nav-li']
					: [styles['nav-li'], styles['close']].join(' ')
			}
			onClick={handleClick}
		>
			<Link
				to={path ?? '#'}
				className={
					match ? [styles['link'], styles['active']].join(' ') : styles['link']
				}
			>
				<div className={[styles['icon-block']].join(' ')}>
					<FontAwesomeIcon icon={icon} />
				</div>
				<span className={[styles['text'], styles['nav-text']].join(' ')}>
					{text}
				</span>
			</Link>
			<span className={styles['tooltip']}>{text}</span>
		</li>
	);
}
