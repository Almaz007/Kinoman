import { Input } from '../../../../components/UI/Input/Input';
import AdminPageTitle from '../../../../components/AuthPageTitle/AuthPageTitle';
import styles from './MovieAddEdit.module.css';
import PrevLink from '../../../../components/PrevLink/PrevLink';
import SelectItem from '../../../../components/UI/SelectItem/SelectItem';
import DateItem from '../../../../components/UI/DateItem/DateItem';
import ControlInputFile from '../../../../components/UI/ControlInputFIle/ControlInputFile';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import MyButton from '../../../../components/UI/button/MyButton';
import FormLoader from '../FromLoader/FormLoader';
import useMovieAddEdit from '../../../../hooks/useMovieAddEdit';

const MovieAddEdit = () => {
	const {
		id,
		submit,
		handleSubmit,
		control,
		img,
		setImg,
		ageLimits,
		genres,
		isFormLoading,
		isFormError
	} = useMovieAddEdit();
	return (
		<section>
			<AdminPageTitle
				title={id ? 'Редактирование' : 'Добавление фильма'}
				className={styles['title']}
			/>
			<PrevLink text='Назад' className={styles['prev__link']} />

			<form className={styles['form']} onSubmit={handleSubmit(submit)}>
				<div className={styles['image__block']}>
					<div className={styles['image']}>
						{img ? (
							<img src={img} alt='upload' />
						) : (
							<div className={styles['img__back']}>Загрузите фото</div>
						)}
					</div>
					<ControlInputFile
						setImg={setImg}
						name='imageFile'
						control={control}
					/>
				</div>
				{isFormLoading ? (
					<FormLoader />
				) : (
					<>
						<div className={styles['entering__data']}>
							<Input
								label='Название'
								name='title'
								control={control}
								sx={{ width: 300 }}
							/>
							<Input
								label='Длительность в минутах'
								name='duration'
								control={control}
								sx={{ width: 300 }}
							/>
							<Input
								label='Режисёр'
								name='directore'
								control={control}
								sx={{ width: 300 }}
							/>
							<Input
								label='Рейтинг'
								name='rating'
								control={control}
								sx={{ width: 300 }}
							/>
							<Input
								label='Страна'
								name='country'
								control={control}
								sx={{ width: 300 }}
							/>
							<SelectItem
								name='ageLimitId'
								label='Возрастное ограничение'
								control={control}
								sx={{ width: 300 }}
								selectItems={ageLimits}
							/>
							<SelectItem
								name='genres'
								label='Жанры'
								control={control}
								multiple
								sx={{ width: 300 }}
								selectItems={genres}
							/>
							<DateItem
								name='releaseDate'
								label='Дата выхода'
								control={control}
								sx={{ width: 300 }}
							/>
							<Textarea
								control={control}
								name='description'
								aria-label='textarea'
								minRows={10}
								placeholder='Описание фильма'
								sx={{ width: 620 }}
							/>
						</div>

						{isFormError && (
							<p className={styles['form__error']}>{isFormError}</p>
						)}
						<MyButton type='submit'>{id ? 'соханить' : 'добавить'}</MyButton>
					</>
				)}
			</form>
		</section>
	);
};
export default MovieAddEdit;
