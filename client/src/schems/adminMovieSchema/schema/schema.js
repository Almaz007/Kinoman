import * as yup from 'yup';

export const defaultValues = {
	title: '',
	duration: '',
	directore: '',
	description: '',
	rating: '',
	country: '',
	ageLimitId: '',
	genres: [],
	releaseDate: new Date()
};

export const schema = yup.object().shape({
	imageFile: yup.mixed().required('Необходимо загрузить'),
	title: yup.string().required('Обязательное поле'),
	description: yup.string().required('Обязательное поле'),
	country: yup.string().required('Обязательное поле'),
	duration: yup
		.number()
		.typeError('значение должно быть числом')
		.min(60, 'значение должно быть не меньше 60 ')
		.required('Обязательное поле'),
	directore: yup.string().required('Обязательное поле'),
	rating: yup
		.number()
		.typeError('значение должно быть числом')
		.min(0, 'значение должно быть не меньше 60 ')
		.required('Обязательное поле'),
	ageLimitId: yup.number().required('Обязательное поле'),
	genres: yup.array().of(yup.number()).min(1, 'выбыерите не менее 1'),
	releaseDate: yup.date().required('Обязательное поле')
});
