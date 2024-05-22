import styles from './loginForm.module.css'

import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { authState } from '../../../store/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import { Context } from '../../../index'
import { ContextForHeader } from '../../UI/header/Header'

const LoginForm = () => {
	const [passVisible, setPassVisible] = useState(false)
	const [resulLogin, setLoginResult] = useState('')

	const handleSignIn = authState(state => state.handleSignIn)
	const isAuth = authState(state => state.isAuth)

	// const {store} = useContext(Context);
	const { setShowModal } = useContext(ContextForHeader)
	const navigate = useNavigate()

	interface ILoginForm {
		email: string
		password: string
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ILoginForm>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<ILoginForm> = async data => {
		await handleSignIn(
			{ email: data.email, password: data.password },
			setShowModal
		)
	}

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<h1>Вход</h1>
				<div className={styles.inputs__block}>
					<div
						className={
							errors?.email
								? [styles.form__group, styles.error__field].join(' ')
								: styles.form__group
						}
					>
						<input
							className={styles.form__input}
							placeholder='example@gmail.com'
							{...register('email', {
								required: 'Это обязательное поле',
								pattern: {
									value:
										/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
									message: 'Не корректный email',
								},
							})}
						/>
						<label className={styles.label__for__input}>Email</label>
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
							placeholder='Password'
							type={passVisible ? 'text' : 'password'}
							{...register('password', {
								required: 'Это обязательное поле',
								pattern: {
									value:
										/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
									message: 'Пароль не соответсвует требованиям',
								},
							})}
						/>
						<label className={styles.label__for__input}>Password</label>
						<div className={styles.pass__visible}>
							<FontAwesomeIcon
								className={styles.passIcon}
								icon={passVisible ? faEyeSlash : faEye}
								onClick={() => setPassVisible(!passVisible)}
							/>
						</div>
						{errors?.password ? (
							<p className={styles.error__message}>
								{errors?.password?.message}
							</p>
						) : (
							<p className={styles.error__message}>{resulLogin}</p>
						)}
					</div>
				</div>
				<div className={styles.button__block}>
					<button className={styles.login__btn}>Войти</button>

					<a className={styles.forgot__pass} href='#'>
						Забыли свой пароль?
					</a>
				</div>
			</form>
		</>
	)
}

export default LoginForm
