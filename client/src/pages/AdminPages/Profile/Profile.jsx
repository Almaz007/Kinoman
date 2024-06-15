import AdminPageTitle from '../../../components/AdminPageTitle/AdminPageTitle';
import AdminProfileData from '../../../components/AdminProfileData/AdminProfileData';
import styles from './profile.module.css';

export default function Profile() {
	return (
		<div>
			<AdminPageTitle className={styles['title']} title='Профиль' />
			<AdminProfileData />
		</div>
	);
}
