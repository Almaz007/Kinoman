import * as yup from 'yup';

export const defaultValues = {
	imageFile: {},
	email: '',
	userName: '',
	phoneNumber: '',
	newPassword: '',
	confirmNewPassword: ''
};
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object().shape({
	email: yup.string().required('Обязательное поле').email('Не валидный email'),
	userName: yup
		.string()
		.required('Обязательное поле')
		.min(3, 'мин-е кол-во символов 3')
		.max(12, 'макс-е кол-во символов 12'),
	phoneNumber: yup.string().matches(phoneRegExp, 'Не валидный номер')
});
