import styles from './loginForm.module.css';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { authState } from '../../../store/store';
import { ContextForHeader } from '../../UI/header/Header';
import { Input } from '../../UI/Input/Input';
import { defaultValues, schema } from '../../../schems/signinSchema/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordInput from '../../UI/PasswordInput/PasswordInput';

const LoginForm = () => {
	const [handleSignIn, isSigninError] = authState(state => [
		state.handleSignIn,
		state.isSigninError
	]);

	const { setShowModal } = useContext(ContextForHeader);
	const navigate = useNavigate();

	const { control, handleSubmit } = useForm({
		defaultValues,
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	const onSubmit = async data => {
		await handleSignIn(
			{ email: data.email, password: data.password },
			setShowModal,
			navigate
		);
	};

	return (
		<>
			<form
				noValidate
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1>Вход</h1>
				<div className={styles.inputs__block}>
					<Input name='email' control={control} label='Email' />
					<PasswordInput name='password' control={control} label='Пароль' />
				</div>
				{isSigninError && (
					<div className={styles['error']}>{isSigninError}</div>
				)}

				<div className={styles.button__block}>
					<button className={styles.login__btn}>Войти</button>

					<a className={styles.forgot__pass} href='#'>
						Забыли свой пароль?
					</a>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
