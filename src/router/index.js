import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/views/Index'
import Checkout from '@/components/Checkout'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'Products',
          component: Products
        },
        {
          path: '/checkout',
          name: 'Checkout',
          component: Checkout
        },
    ]
})
