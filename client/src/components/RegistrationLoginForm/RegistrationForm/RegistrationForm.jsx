import styles from './registrationForm.module.css';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { authState } from '../../../store/store';
import { ContextForHeader } from '../../UI/header/Header';
import { defaultValues, schema } from '../../../schems/signupSchema/schema';
import PasswordInput from '../../UI/PasswordInput/PasswordInput';
import { Input } from '../../UI/Input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';

const RegistrationForm = ({}) => {
	const [handleSignUp, isSignupError] = authState(state => [
		state.handleSignUp,
		state.isSignupError
	]);
	const { setShowModal } = useContext(ContextForHeader);

	const { handleSubmit, control } = useForm({
		defaultValues,
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	const onSubmit = async data => {
		delete data['confirmPassword'];
		handleSignUp(data, setShowModal, Swal);
	};
	return (
		<form noValidate className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1>Создание аккаунта</h1>
			<div className={styles.inputs__block}>
				<Input name='userName' control={control} label='Имя пользователя' />
				<Input name='email' control={control} label='Email' />
				<Input name='phoneNumber' control={control} label='Номер телефона' />
				<PasswordInput name='password' control={control} label='Пароль' />
				<PasswordInput
					name='confirmPassword'
					control={control}
					label='Подтвердите пароль'
				/>
			</div>
			{isSignupError && <div className={styles['error']}>{isSignupError}</div>}
			<button className={styles.registration__btn}>Регистрация</button>
		</form>
	);
};

export default RegistrationForm;
