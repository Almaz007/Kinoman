import { useState } from 'react';

import styles from './registrationLoginForm.module.css';

import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginForm from './LoginForm/LoginForm';
import OverlayContainer from './OverlayContainer/OverlayContainer';

const RegistrationLoginForm = () => {
	const [panelSwitch, setPanelSwitch] = useState(false);

	return (
		<div
			className={
				panelSwitch
					? [
							styles.registration__login__container,
							styles.right__panel__active
					  ].join(' ')
					: styles.registration__login__container
			}
		>
			<div
				className={[
					styles.form__container,
					styles.registration__container
				].join(' ')}
			>
				<RegistrationForm />
			</div>
			<div
				className={[styles.form__container, styles.login__container].join(' ')}
			>
				<LoginForm />
			</div>
			<div className={[styles.overlay__container].join(' ')}>
				<OverlayContainer
					parrentElemStyles={styles}
					setPanelSwitch={setPanelSwitch}
				/>
			</div>
		</div>
	);
};

export default RegistrationLoginForm;
