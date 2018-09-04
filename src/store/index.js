import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persistedstate";

Vue.use(Vuex)

import products from './modules/products'
import cart from './modules/cart'

const store = new Vuex.Store({
	modules: {
		products,
		cart
	},
	strict: process.env.NODE_ENV !== 'production',
	plugins: [
		VuexPersist({
			key: 'shieff'
		})
	]
})

Vue.prototype.$store = store

export default store