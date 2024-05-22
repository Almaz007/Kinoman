import styles from './registrationForm.module.css'
import { useState, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { authState } from '../../../store/store'
import { ContextForHeader } from '../../UI/header/Header'

const RegistrationForm = ({}) => {
	const [passVisible1, setPassVisible1] = useState(false)
	const [passVisible2, setPassVisible2] = useState(false)

	const handleSignUp = authState(state => state.handleSignUp)

	const { setShowModal } = useContext(ContextForHeader)

	interface IRegistrationForm {
		userName: string
		phoneNumber: string
		email: string
		password: string
		confirmPass: string
	}
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm<IRegistrationForm>({
		mode: 'onChange',
	})
	const onSubmit: SubmitHandler<IRegistrationForm> = async data => {
		console.log(data)
		await handleSignUp(
			{
				userName: data.userName,
				phoneNumber: data.phoneNumber,
				email: data.email,
				password: data.password,
			},
			setShowModal
		)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1>Создание аккаунта</h1>
			<div className={styles.inputs__block}>
				<div
					className={
						errors?.userName
							? [styles.form__group, styles.error__field].join(' ')
							: styles.form__group
					}
				>
					<input
						className={styles.form__input}
						placeholder='Имя пользователя'
						{...register('userName', {
							required: 'Это обязательное поле',
							minLength: {
								value: 3,
								message: 'Должно содержать 3 или более символов',
							},
							maxLength: {
								value: 10,
								message: 'Должно содержать 10 или менее символов',
							},
						})}
					/>
					<label className={styles.label__for__input}>Имя</label>
					{errors?.userName && (
						<p className={styles.error__message}>{errors?.userName?.message}</p>
					)}
				</div>
				<div
					className={
						errors?.phoneNumber
							? [styles.form__group, styles.error__field].join(' ')
							: styles.form__group
					}
				>
					<input
						className={styles.form__input}
						type='text'
						placeholder='Номер телефона'
						{...register('phoneNumber', {
							required: 'Это обязательное поле',
							pattern: {
								value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
								message: 'Не корректный номер телефона',
							},
						})}
					/>
					<label className={styles.label__for__input}>Номер телефона</label>
					{errors?.phoneNumber && (
						<p className={styles.error__message}>
							{errors?.phoneNumber?.message}
						</p>
					)}
				</div>
				<div
					className={
						errors?.email
							? [styles.form__group, styles.error__field].join(' ')
							: styles.form__group
					}
				>
					<input
						className={styles.form__input}
						type='email'
						placeholder='email'
						{...register('email', {
							required: 'Это обязательное поле',
							pattern: {
								value:
									/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
								message: 'Не корректный email',
							},
						})}
					/>
					<label className={styles.label__for__input}>email</label>
					{errors?.email && (
						<p className={styles.error__message}>{errors?.email?.message}</p>
					)}
				</div>
				<div
					className={
						errors?.password
							? [styles.form__group, styles.error__field].join(' ')
							: styles.form__group
					}
				>
					<input
						className={[styles.form__input, styles.pass__input].join(' ')}
						type={passVisible1 ? 'text' : 'password'}
						placeholder='Пароль'
						{...register('password', {
							required: 'Это обязательное поле',
							pattern: {
								value:
									/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
								message: 'Пароль не соответсвует требованиям',
							},
						})}
					/>
					<label className={styles.label__for__input}>Пароль</label>
					<div className={styles.pass__visible}>
						<FontAwesomeIcon
							className={styles.passIcon}
							icon={passVisible1 ? faEyeSlash : faEye}
							onClick={() => setPassVisible1(!passVisible1)}
						/>
					</div>
					{errors?.password && (
						<p className={styles.error__message}>{errors?.password?.message}</p>
					)}
				</div>
				<div
					className={
						errors?.confirmPass
							? [styles.form__group, styles.error__field].join(' ')
							: styles.form__group
					}
				>
					<input
						className={[styles.form__input, styles.pass__input].join(' ')}
						type={passVisible2 ? 'text' : 'password'}
						placeholder='Подтвердить'
						{...register('confirmPass', {
							required: 'Это обязательное поле',
							pattern: {
								value:
									/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
								message: 'Пароль не соответсвует требованиям',
							},
							validate: (val: string) => {
								if (watch('password') != val) {
									return 'Пароли не совпадают'
								}
							},
						})}
					/>
					<label className={styles.label__for__input}>
						Подтверждение пароля
					</label>
					<div className={styles.pass__visible}>
						<FontAwesomeIcon
							className={styles.passIcon}
							icon={passVisible2 ? faEyeSlash : faEye}
							onClick={() => setPassVisible2(!passVisible2)}
						/>
					</div>
					{errors?.confirmPass && (
						<p className={styles.error__message}>
							{errors?.confirmPass?.message}
						</p>
					)}
				</div>
			</div>
			<button className={styles.registration__btn}>Регистрация</button>
		</form>
	)
}

export default RegistrationForm
