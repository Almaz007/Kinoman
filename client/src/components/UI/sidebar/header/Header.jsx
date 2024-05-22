import styles from './header.module.css'
import { useContext } from 'react'
import { authState } from '../../../../store/store'

import { ContextForAdminLayout } from '../../../layout/adminLayout/AdminLayout'

export default function Header() {
	const { userName, avatarSrc } = authState(state => state.userData)
	const { sidebarVisible } = useContext(ContextForAdminLayout)

	return (
		<header className={sidebarVisible ? '' : styles['close']}>
			<div className={styles['profile']}>
				<div className={styles['image']}>
					{avatarSrc ? (
						<img src={avatarSrc} alt='avatar' />
					) : (
						<img src='/images/defaultAvatar.jpg' />
					)}
				</div>

				<div className={styles['profile-text']}>
					<span className={styles['name']}>{userName}</span>
					<span className={styles['profession']}>Aministrator</span>
				</div>
			</div>
		</header>
	)
}
