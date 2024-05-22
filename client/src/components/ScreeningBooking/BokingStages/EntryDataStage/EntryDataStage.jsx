import styles from './entryDataStage.module.css'
import { useEffect, useMemo } from 'react'
import { authState } from '../../../../store/store'
import { screeningBookingState } from '../../../../store/store'
import { useForm } from 'react-hook-form'

const EntryDataStage = () => {
	const [isAuth, userData] = authState(state => [state.isAuth, state.userData])
	const [updateСhequeSendInfo, getСhequeSendInfo] = screeningBookingState(
		state => [state.updateСhequeSendInfo, state.getСhequeSendInfo]
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: 'onChange',
	})

	const onSubmit = async data => {
		const { email, phoneNumber } = data
		updateСhequeSendInfo(email, phoneNumber)
	}
	const isValid = !!Object.keys(errors)

	useEffect(() => {
		updateСhequeSendInfo('', '')
	}, [isValid])

	const { defaultEmail, defaultPhoneNumber } = useMemo(() => {
		return getСhequeSendInfo()
	}, [])

	// useEffect(() => {
	// 	if (isAuth) {
	// 		updateСhequeSendInfo(userData.email, userData.phoneNumber)
	// 	}
	// }, [isAuth])

	return (
		<div className={styles.entryDataBlock}>
			<h2 className={styles.title}>Ввод данных</h2>
			<div className={styles.entryData}>
				<h2 className={styles.entryDataTitle}>Введите данные</h2>
				<form onChange={handleSubmit(onSubmit)}>
					<div
						className={
							errors?.email
								? [styles.formGroup, styles.errorField].join(' ')
								: styles.formGroup
						}
					>
						<input
							className={styles.formInput}
							defaultValue={defaultEmail}
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
						<label className={styles.labelForInput}>Email</label>
						{errors?.email && (
							<p className={styles.errorMessage}>{errors?.email?.message}</p>
						)}
					</div>
					<div
						className={
							errors?.phoneNumber
								? [styles.formGroup, styles.errorField].join(' ')
								: styles.formGroup
						}
					>
						<input
							className={styles.formInput}
							defaultValue={defaultPhoneNumber}
							placeholder='+7 900 000-00-00'
							{...register('phoneNumber', {
								required: 'Это обязательное поле',
								pattern: {
									value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
									message: 'Не корректный номер телефона',
								},
							})}
						/>
						<label className={styles.labelForInput}>Номер телефона</label>
						{errors?.phoneNumber && (
							<p className={styles.errorMessage}>
								{errors?.phoneNumber?.message}
							</p>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default EntryDataStage
