import { ContextForAdminLayout } from '../../../layout/adminLayout/AdminLayout'
import styles from './menu-links.module.css'
import CustomLink from './custom-link/custom-link'
import { useContext } from 'react'

export default function MenuLinks({ Links }) {
	const { setSidebarVisible } = useContext(ContextForAdminLayout)

	return (
		<ul className={styles['menu-links']}>
			{Links.map(link => (
				<CustomLink
					key={link.id}
					path={link.path}
					text={link.text}
					icon={link.icon}
					handleClick={() => setSidebarVisible(false)}
				/>
			))}
		</ul>
	)
}
