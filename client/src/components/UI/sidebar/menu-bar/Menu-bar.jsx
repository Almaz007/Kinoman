import styles from './menuBar.module.css'
import { NavLinksData } from '../menu-links/nav-links-data'
import MenuLinks from '../menu-links/menu-links'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import NavLink from '../menu-links/custom-link/custom-link'
import { authState } from '../../../../store/store'
import CustomLink from '../menu-links/custom-link/custom-link'

export default function MenuBar() {
	const handleLogOut = authState(state => state.handleLogOut)

	return (
		<div className={styles['menu-bar']}>
			<div className={styles['menu']}>
				<MenuLinks Links={NavLinksData} />
			</div>

			<div className={styles['bottom-content']}>
				<CustomLink
					text={'Выйти'}
					icon={faArrowRightFromBracket}
					handleClick={handleLogOut}
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
	)
}
