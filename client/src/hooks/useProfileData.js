import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { authState } from '../store/store';
import { ProfileState } from '../store/store';
import { defaultValues, schema } from '../schems/ProfileSchema/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';

const useProfileData = () => {
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
	] = ProfileState(state => [
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

	const submit = async data => {
		const result = await Swal.fire({
			title: 'Вы точно хотите сохранить изменения?',
			showCancelButton: true,
			confirmButtonText: 'Сохранить',
			cancelButtonText: 'Отмена',
			confirmButtonColor: '#0030e2',
			cancelButtonColor: '#d33',
			showLoaderOnConfirm: true,
			preConfirm: async () => await updateProfileData(data, Swal),
			allowOutsideClick: () => !Swal.isLoading()
		});
		if (result.isConfirmed) {
			updateUserData(result.value);
			Swal.fire({
				title: 'Сохранено!',
				confirmButtonColor: '#0030e2',
				icon: 'success'
			});
		}
	};
	const delImg = () => {
		setImg('');
		setValue('imageFile', {});
	};
	useEffect(() => {
		console.log('useEffect start ');
		initFormData(userData, reset, setImg);
	}, [userData, reset]);

	return {
		submit,
		img,
		setImg,
		delImg,
		control,
		handleSubmit,
		isErrorMessage,
		isDataSendLoading,
		isImgLodaing
	};
};

export default useProfileData;
