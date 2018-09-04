import api from '../index'

export default {

	async get() {
		let res = await api().get('products');
		return res.data;
	}
	
}