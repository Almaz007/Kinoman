import { useForm } from 'react-hook-form';
import {
	defaultValues,
	schema
} from '../../pages/AdminPages/Profile/schema/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './adminProfile.module.css';
import { useEffect, useState } from 'react';
import ControlInputFile from '../UI/ControlInputFIle/ControlInputFile';
import MyButton from '../UI/button/MyButton';
import { Input } from '../UI/Input/Input';
import PasswordInput from '../UI/PasswordInput/PasswordInput';
import { adminProfileState, authState } from '../../store/store';
import ImgLoader from './imgLoader/imgLoader';
import { MdDelete } from 'react-icons/md';

const AdminProfileData = () => {
	const [img, setImg] = useState('');
	const [userData, updateUserData] = authState(state => [
		state.userData,
		state.updateUserData
	]);
	const [
		initFormData,
		updateProfileData,
		isErrorMessage,
		isDataSendLoading,
		isImgLodaing
	] = adminProfileState(state => [
		state.initFormData,
		state.updateProfileData,
		state.isErrorMessage,
		state.isDataSendLoading,
		state.isImgLodaing
	]);

	const { control, reset, setValue, handleSubmit } = useForm({
		defaultValues,
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	const submit = data => {
		updateProfileData(data, updateUserData);
	};
	const delImg = () => {
		setImg('');
		setValue('imageFile', {});
	};
	useEffect(() => {
		initFormData(userData, reset, setImg);
	}, [userData, reset]);
	return (
		<>
			<form className={styles['profile__from']} onSubmit={handleSubmit(submit)}>
				<h2 className={styles['form__title']}>Данные о пользователе</h2>
				<div className={styles['form__row']}>
					<div className={styles['image__section']}>
						{img && (
							<div className={styles['delete__img']} onClick={() => delImg()}>
								<MdDelete />
							</div>
						)}
						<div className={styles['image__block']}>
							{isImgLodaing ? (
								<ImgLoader />
							) : (
								img && (
									<img className={styles['image']} src={img} alt='upload' />
								)
							)}
						</div>

						<ControlInputFile
							img={img}
							setImg={setImg}
							name='imageFile'
							control={control}
						/>
					</div>
					<div className={styles['fields']}>
						{' '}
						<Input
							label='UserName'
							name='userName'
							control={control}
							sx={{ width: 300 }}
						/>
						<Input
							label='Email'
							name='email'
							control={control}
							sx={{ width: 300 }}
						/>
						<Input
							label='Номер телефона'
							name='phoneNumber'
							control={control}
							sx={{ width: 300 }}
						/>
					</div>
				</div>
				<div className={styles['change__password']}>
					<h2 className={styles['pass__title']}>Смена пароля</h2>
					<div className={styles['password__fields']}>
						<PasswordInput
							label='Новый пароль'
							name='newPassword'
							control={control}
							sx={{ width: 300 }}
						/>
						<PasswordInput
							label='Подтвердите пароль'
							name='confirmNewPassword'
							control={control}
							sx={{ width: 300 }}
						/>
					</div>
				</div>
				<div className={styles['form__bottom']}>
					<MyButton className={styles['btn__save']}>Сохранить</MyButton>
					{isErrorMessage && (
						<p className={styles['error__message']}>{isErrorMessage}</p>
					)}
				</div>
			</form>
		</>
	);
};

export default AdminProfileData;
