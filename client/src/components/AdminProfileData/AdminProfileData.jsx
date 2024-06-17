import styles from './adminProfile.module.css';
import ControlInputFile from '../UI/ControlInputFIle/ControlInputFile';
import MyButton from '../UI/button/MyButton';
import { Input } from '../UI/Input/Input';
import PasswordInput from '../UI/PasswordInput/PasswordInput';
import ImgLoader from '../imgLoader/imgLoader';
import { MdDelete } from 'react-icons/md';
import useProfileData from '../../hooks/useProfileData';

const AdminProfileData = () => {
	const {
		submit,
		img,
		setImg,
		delImg,
		control,
		handleSubmit,
		isErrorMessage,
		isDataSendLoading,
		isImgLodaing
	} = useProfileData();
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
							name='password'
							control={control}
							sx={{ width: 300 }}
						/>
						<PasswordInput
							label='Подтвердите пароль'
							name='confirmPassword'
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
