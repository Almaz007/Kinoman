import * as yup from 'yup';

export const defaultValues = {
	userName: '',
	email: '',
	phoneNumber: '',
	password: '',
	confirmPassword: ''
};
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object().shape({
	userName: yup
		.string()
		.required('Обязательное поле')
		.min(3, 'мин-е кол-во символов 3')
		.max(12, 'макс-е кол-во символов 12'),
	email: yup.string().required('Обязательное поле').email('Email не валидный'),
	phoneNumber: yup.string().matches(phoneRegExp, 'Не валидный номер'),
	password: yup
		.string()
		.matches(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
			'Пароль не валидный'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
});
