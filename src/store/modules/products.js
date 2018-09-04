import products from '@/api/requests/products'

const state = {
	products: []
}


const mutations = {
	setProducts(state, data) {
		state.products = data
	}
}

const getters = {
	all(state) {
		return state.products
	}
}

const actions = {
	async getProducts({commit}) {
		let res = await products.get()
		commit('setProducts', res)
		console.log('requests', res)
	}
}


export default {
  	namespaced: true,
	state,
	mutations,
	getters,
	actions
}