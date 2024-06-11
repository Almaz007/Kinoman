import styles from './overlayContainer.module.css';

const OverlayContainer = ({ parrentElemStyles, setPanelSwitch }) => {
	return (
		<div className={parrentElemStyles.overlay}>
			<div
				className={[
					styles.overlay__panel,
					parrentElemStyles.overlay__left
				].join(' ')}
			>
				<h1>Регистрация</h1>
				<p className={styles.overlay__text}>
					Введите свои данные, чтобы создать учетную запись
				</p>
				<button
					className={styles.ghost}
					onClick={() => setPanelSwitch(false)}
					id='login'
				>
					Войти
				</button>
			</div>
			<div
				className={[
					styles.overlay__panel,
					parrentElemStyles.overlay__right
				].join(' ')}
			>
				<h1>Вход</h1>
				<p className={styles.overlay__text}>
					Введите свои личные данные чтобый войти в систему
				</p>
				<button
					className={styles.ghost}
					onClick={() => setPanelSwitch(true)}
					id='registration'
				>
					Зарегистрироваться
				</button>
			</div>
		</div>
	);
};

export default OverlayContainer;
