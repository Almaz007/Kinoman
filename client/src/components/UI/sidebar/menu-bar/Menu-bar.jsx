import styles from './menuBar.module.css';
import { NavLinksData } from '../menu-links/nav-links-data';
import MenuLinks from '../menu-links/menu-links';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { authState } from '../../../../store/store';
import CustomLink from '../menu-links/custom-link/custom-link';
import { useNavigate } from 'react-router-dom';
import { AdminLinks } from '../../../../routes/adminLinks';

export default function MenuBar() {
	const handleLogOut = authState(state => state.handleLogOut);
	const navigate = useNavigate();

	return (
		<div className={styles['menu-bar']}>
			<div className={styles['menu']}>
				<MenuLinks Links={AdminLinks} />
			</div>

			<div className={styles['bottom-content']}>
				<CustomLink
					text={'Выйти'}
					icon={faArrowRightFromBracket}
					handleClick={() => handleLogOut(navigate)}
				/>
				{/* <li className={styles['mode']}>
					<div className={styles['sun-moon']}>
						<div className={[styles['icon'], styles['moon']].join(' ')}></div>
						<div className={[styles['icon'], styles['sun']].join(' ')}></div>
					</div>
					<span className={[styles['mode-text'], styles['text']].join(' ')}>
						Dark mode
					</span>

					<div className={styles['toggle-switch']}>
						<span className={styles['switch']}></span>
					</div>
				</li> */}
			</div>
		</div>
	);
}
