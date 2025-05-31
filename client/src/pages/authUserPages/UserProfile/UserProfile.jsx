import styles from './userProfile.module.css';
import AuthPageTitle from '../../../components/AuthPageTitle/AuthPageTitle';
import ControlInputFile from '../../../components/UI/ControlInputFIle/ControlInputFile';
import ImgLoader from '../../../components/imgLoader/imgLoader';
import { MdDelete } from 'react-icons/md';
import useProfileData from '../../../hooks/useProfileData';
import { Input } from '../../../components/UI/Input/Input';
import PasswordInput from '../../../components/UI/PasswordInput/PasswordInput';
import MyButton from '../../../components/UI/button/MyButton';

const UserProfile = () => {
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
		<div className={styles['user__profile']}>
			<AuthPageTitle className={styles['title']} title='Профиль пользователя' />
			<form className={styles['user__form']} onSubmit={handleSubmit(submit)}>
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

					<div className={styles['profile__fields']}>
						<div className={styles['data__fields']}>
							<h2 className={styles['fields__title']}>Личные данные</h2>
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
					</div>
				</div>

				<div className={styles['form__bottom']}>
					<MyButton className={styles['save__btn']}>Сохранить</MyButton>
					{isErrorMessage && (
						<p className={styles['error__message']}>{isErrorMessage}</p>
					)}
				</div>
			</form>
		</div>
	);
};

export default UserProfile;
