import styles from './dropdownBtn.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { authState } from '../../../store/store'

export default function DropdownBtn({
	setDropdownVisible,
	dropdownVisible = { dropdownVisible },
}) {
	const { userName } = authState(state => state.userData)

	return (
		<div
			className={styles['profile-dropdown-btn']}
			onClick={() => setDropdownVisible(prev => !prev)}
		>
			<div className={styles['provile-img']} style={{ width: '48px' }}>
				<img src='/public/images/defaultAvatar.jpg' alt='avatar' />
			</div>
			<div className={styles['profile-text']}>
				<div className={styles['user-name']}>{userName}</div>
				<FontAwesomeIcon
					icon={faChevronDown}
					className={
						dropdownVisible
							? [styles['arrow-down'], styles['up']].join(' ')
							: styles['arrow-down']
					}
				/>
			</div>
		</div>
	)
}
