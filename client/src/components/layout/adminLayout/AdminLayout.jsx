import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../UI/sidebar/Sidebar';
import styles from './adminLayout.module.css';

export const ContextForAdminLayout = createContext();

export default function AdminLayout() {
	const [sidebarVisible, setSidebarVisible] = useState(false);

	return (
		<ContextForAdminLayout.Provider
			value={{ sidebarVisible, setSidebarVisible }}
		>
			<div className={styles['admin-section']}>
				<Sidebar
					sidebarVisible={sidebarVisible}
					setSidebarVisible={setSidebarVisible}
				/>
				<section className={styles['page']}>
					<Outlet />
					<div
						onClick={() => setSidebarVisible(false)}
						className={
							sidebarVisible
								? styles['sidebar-overlay']
								: [(styles['sidebar-overlay'], styles['close'])].join(' ')
						}
					></div>
				</section>
			</div>
		</ContextForAdminLayout.Provider>
	);
}
