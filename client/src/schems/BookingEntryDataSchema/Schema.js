import * as yup from 'yup';

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object().shape({
	email: yup.string().required('Обязательное поле').email('Не валидный email'),
	phoneNumber: yup.string().matches(phoneRegExp, 'Не валидный номер')
});
