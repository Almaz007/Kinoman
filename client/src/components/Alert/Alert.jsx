import MyButton from '../UI/button/MyButton';
import styles from './alert.module.css';

const Alert = ({ text, succes }) => {
	return (
		<div className={styles['alert']}>
			<div className={styles['icon']}></div>
			<p className={styles['alert__text']}></p>
			<MyButton>Ок</MyButton>
		</div>
	);
};

export default Alert;
