import AuthPageTitle from '../../../components/AuthPageTitle/AuthPageTitle';
import AdminProfileData from '../../../components/AdminProfileData/AdminProfileData';
import styles from './profile.module.css';

export default function Profile() {
	return (
		<div>
			<AuthPageTitle className={styles['title']} title='Профиль' />
			<AdminProfileData />
		</div>
	);
}
