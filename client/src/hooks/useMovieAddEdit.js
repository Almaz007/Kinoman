import { useState, useEffect } from 'react';
import { moviesState } from '../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	defaultValues,
	schema
} from '../schems/adminMovieSchema/schema/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';

const useMovieAddEdit = () => {
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

	const submit = async data => {
		if (id) {
			const result = await Swal.fire({
				title: 'Вы точно хотите сохранить изменения?',
				showCancelButton: true,
				confirmButtonText: 'Сохранить',
				cancelButtonText: 'Отмена',
				confirmButtonColor: '#0030e2',
				cancelButtonColor: '#d33',
				showLoaderOnConfirm: true,
				preConfirm: async () => await updateMovie(data, navigate, Swal),
				allowOutsideClick: () => !Swal.isLoading()
			});
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Сохранено!',
					confirmButtonColor: '#0030e2',
					icon: 'success'
				});
			}
		} else {
			const result = await Swal.fire({
				title: 'Вы точно хотите добавить фильм?',
				showCancelButton: true,
				confirmButtonText: 'Добавить',
				cancelButtonText: 'Отмена',
				confirmButtonColor: '#0030e2',
				cancelButtonColor: '#d33',
				showLoaderOnConfirm: true,
				preConfirm: async () => await createMovie(data, navigate, Swal),
				allowOutsideClick: () => !Swal.isLoading()
			});
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Фильм успешно добавлен!',
					confirmButtonColor: '#0030e2',
					icon: 'success'
				});
			}
		}
	};

	return {
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
	};
};

export default useMovieAddEdit;
