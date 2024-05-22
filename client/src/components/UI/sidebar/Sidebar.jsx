import { useState, createContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Header from './header/Header'
import MenuBar from './menu-bar/Menu-bar'
import styles from './sidebar.module.css'

export default function Sidebar({ sidebarVisible, setSidebarVisible }) {
	return (
		<div
			className={
				sidebarVisible
					? styles['sidebar-block']
					: [styles['sidebar-block'], styles['close']].join(' ')
			}
		>
			<div
				className={styles['toggle']}
				onClick={() => setSidebarVisible(prev => !prev)}
			>
				<FontAwesomeIcon icon={faChevronRight} />
			</div>
			<nav className={styles['sidebar']}>
				<Header />
				<MenuBar />
			</nav>
		</div>
	)
}
