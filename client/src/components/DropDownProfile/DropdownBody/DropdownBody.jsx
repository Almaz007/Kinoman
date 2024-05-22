import DropdownList from '../DropdownList/DropdownList'
import DropdownHeader from '../DropdownHeader/DropdownHeader'
import styles from './dropdownBody.module.css'

export default function DropdownBody({ dropdownVisible, setDropdownVisible }) {
	return (
		<div
			className={
				dropdownVisible
					? [styles['dropdown-body'], styles['visible']].join(' ')
					: styles['dropdown-body']
			}
		>
			<DropdownHeader />
			<DropdownList />
		</div>
	)
}
