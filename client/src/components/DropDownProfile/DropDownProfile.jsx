import styles from './dropDownProfile.module.css'

import { useState, useRef, useEffect, createContext } from 'react'
import DropdownBtn from './DropdownBtn/DropdownBtn'
import DropdownBody from './DropdownBody/DropdownBody'

export const dropdownContext = createContext()

export default function DropDownProfile() {
	const [dropdownVisible, setDropdownVisible] = useState(false)
	const dropdownRef = useRef()

	useEffect(() => {
		const handleClickWindow = e => {
			if (!dropdownRef.current.contains(e.target)) {
				setDropdownVisible(false)
			}
		}

		document.addEventListener('mousedown', handleClickWindow)

		return () => {
			document.removeEventListener('mousedown', handleClickWindow)
		}
	}, [])

	return (
		<dropdownContext.Provider value={{ dropdownVisible, setDropdownVisible }}>
			<div className={styles['profile-dropdown']} ref={dropdownRef}>
				<DropdownBtn
					setDropdownVisible={setDropdownVisible}
					dropdownVisible={dropdownVisible}
				/>
				<DropdownBody
					dropdownVisible={dropdownVisible}
					setDropdownVisible={setDropdownVisible}
				/>
			</div>
		</dropdownContext.Provider>
	)
}
