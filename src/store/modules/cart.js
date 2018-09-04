import products from '@/api/requests/products'

const state = {
	items: []
}


const mutations = {
	add(state, data) {
		state.items.push(data)
	},
	update(state, [key, data]) {
		for(let index in data) state.items[key][index] = data[index]
	},
	delete(state, key) {
		state.items.splice(key, 1)
	}
}

const getters = {
	all(state) {
		return state.items
	}
}

const actions = {
	async getProducts({commit}) {
		let res = await products.get()
		commit('setProducts', res)
	}
}


export default {
  	namespaced: true,
	state,
	mutations,
	getters,
	actions
}