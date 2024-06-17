import * as yup from 'yup';

export const defaultValues = {
	email: '',
	password: ''
};

export const schema = yup.object().shape({
	email: yup.string().required('Обязательное поле').email('Email не валидный'),
	password: yup
		.string()
		.matches(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
			'Пароль не валидный'
		)
});
