import $api from '../http';

export default class MovieService {
	static async getFormData() {
		return await $api.get('/movies/getFormData');
	}
}
