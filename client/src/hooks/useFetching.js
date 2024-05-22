import { useState } from 'react'

export const useFetching = callback => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const fetching = async (...args) => {
		try {
			setIsLoading(true)
			await callback(...args)
		} catch (err) {
			setError(err.message)
		} finally {
			// setTimeout(() => setIsLoading(false), 2000)
			setIsLoading(false)
		}
	}
	return [fetching, isLoading, error]
}
