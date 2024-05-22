import validateRequest from '../utils/ValidateRequest.js'
import * as Yup from 'yup'

export const signInSchema = Yup.object({
	body: Yup.object({
		email: Yup.string().required('Поле обязательно!').email(),
		password: Yup.string()
			.required('Поле обязательно!')
			.min(3, 'Пароль слишком короткий - минимум 3 символа')
			.max(50, 'Максимальная длина - 50 символов'),
	}),
})

export const signUpSchema = Yup.object({
	body: Yup.object({
		userName: Yup.string()
			.required('Поле обязательно!')
			.min(3, 'Минимальная длина - 10 символов')
			.max(10, 'Максимальная длина - 10 символов'),
		email: Yup.string()
			.required()
			.matches(
				/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
				'Не корректный email'
			),
		phoneNumber: Yup.string()
			.required()
			.matches(
				/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
				'Номер не соответсвует требованиям'
			),
		password: Yup.string()
			.required('Поле обязательно!')
			.min(8, 'Пароль слишком короткий - минимум 8 символа')
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
				'Пароль не соответсвует требованиям'
			),
	}),
})

export const logoutSchema = Yup.object({
	cookies: Yup.object({
		refreshToken: Yup.string().required('Поле обязательно!'),
	}),
})

class AuthValidator {
	static async signIn(req, res, next) {
		return validateRequest(req, res, next, signInSchema)
	}

	static async signUp(req, res, next) {
		return validateRequest(req, res, next, signUpSchema)
	}

	static async logOut(req, res, next) {
		return validateRequest(req, res, next, logoutSchema)
	}

	static async refresh(req, res, next) {
		return validateRequest(req, res, next)
	}
}

export default AuthValidator
