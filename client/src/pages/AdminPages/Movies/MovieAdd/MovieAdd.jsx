import { useForm } from 'react-hook-form';

import { Input } from '../../../../components/UI/Input/Input';
import AdminPageTitle from '../../../../components/AdminPageTitle/AdminPageTitle';
import styles from './MovieAdd.module.css';
import PrevLink from '../../../../components/PrevLink/PrevLink';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectItem from '../../../../components/UI/SelectItem/SelectItem';
import DateItem from '../../../../components/UI/DateItem/DateItem';
import ControlInputFile from '../../../../components/UI/ControlInputFIle/ControlInputFile';
import { useEffect, useState } from 'react';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import MyButton from '../../../../components/UI/button/MyButton';
import { defaultValues, schema } from './schema/schema';
import { moviesState } from '../../../../store/store';
import FormLoader from '../FromLoader/FormLoader';
import $api from '../../../../http';
import { useNavigate, useParams } from 'react-router-dom';

const MovieAdd = () => {
	const [img, setImg] = useState('');
	const [
		fetchFormData,
		createMovie,
		updateMovie,
		getMovieDataById,
		isFormLoading,
		isFormError,
		ageLimits,
		genres
	] = moviesState(state => [
		state.fetchFormData,
		state.createMovie,
		state.updateMovie,
		state.getMovieDataById,
		state.isFormLoading,
		state.isFormError,
		state.ageLimits,
		state.genres
	]);

	const navigate = useNavigate();
	const { id } = useParams();

	const { control, reset, handleSubmit } = useForm({
		defaultValues,
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		fetchFormData();

		if (id) {
			getMovieDataById(id, reset, setImg);
		}
	}, []);

	const submit = data => {
		if (id) {
			updateMovie(data, navigate);
		} else {
			createMovie(data, navigate);
		}
	};

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
export default MovieAdd;
