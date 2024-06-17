import styles from './entryDataStage.module.css';
import { useEffect, useMemo } from 'react';
import { authState } from '../../../../store/store';
import { screeningBookingState } from '../../../../store/store';
import { useForm } from 'react-hook-form';
import { Input } from '../../../UI/Input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../../schems/BookingEntryDataSchema/Schema';

const EntryDataStage = () => {
	const [isAuth, userData] = authState(state => [state.isAuth, state.userData]);

	const [updateСhequeSendInfo, updateErrors, chequeSendInfo] =
		screeningBookingState(state => [
			state.updateСhequeSendInfo,
			state.updateErrors,
			state.chequeSendInfo
		]);
	const { email, phoneNumber } = chequeSendInfo;

	const {
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm({
		defaultValues: { email, phoneNumber },
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	const onSubmit = async data => {
		console.log(data);
		const { email, phoneNumber } = data;
		updateСhequeSendInfo(email, phoneNumber);
	};
	const handleclick = () => {
		const { email, phoneNumber } = userData;
		const newData = { email, phoneNumber };

		reset(newData);
		onSubmit(newData);
	};

	useEffect(() => {
		updateErrors(errors);
	}, [errors]);

	return (
		<div className={styles.entryDataBlock}>
			<h2 className={styles.title}>Ввод данных</h2>
			<div className={styles.entryData}>
				<h2 className={styles.entryDataTitle}>Введите данные</h2>
				<form className={styles['form']} onChange={handleSubmit(onSubmit)}>
					<Input
						name='email'
						control={control}
						label='Почта'
						sx={{ width: '100%' }}
					/>
					<Input
						name='phoneNumber'
						control={control}
						label='Номер телефона'
						sx={{ width: '100%' }}
					/>
				</form>
				{isAuth && (
					<div className={styles['fill__data']}>
						<p className={styles['text']}>
							Вы атворизованы и имеете возможность заполнить данные
							автоматический
						</p>
						<button className={styles['fill__btn']} onClick={handleclick}>
							Заполнить
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default EntryDataStage;
