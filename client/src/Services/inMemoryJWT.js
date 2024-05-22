import config from '../config'
import $api from '../http/index'
const inMemoryJWTService = () => {
	let inMemoryJWT = null

	const getToken = () => inMemoryJWT

	const setToken = (token, tokenExpiration) => {
		inMemoryJWT = token
		refreshToken(tokenExpiration)
	}

	const deleteToken = () => {
		inMemoryJWT = null
		abortRefreshToken()
		localStorage.setItem(config.LOGOUT_STORAGE_KEY, Date.now())
	}

	let refreshTimeoutId = null

	const refreshToken = expiration => {
		const timeoutTrigger = expiration - 20000

		refreshTimeoutId = setTimeout(() => {
			$api
				.post('/auth/refresh')
				.then(res => {
					const { accesToken, accesTokenExpiration } = res.data
					setToken(accesToken, accesTokenExpiration)
				})
				.catch(err => {
					console.log(err)
				})
		}, timeoutTrigger)
	}

	const abortRefreshToken = () => {
		if (refreshTimeoutId) {
			clearTimeout(refreshTimeoutId)
		}
	}
	return { getToken, setToken, deleteToken }
}

export default inMemoryJWTService()
