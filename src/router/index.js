import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout'

import Products from '@/views/Index'
import Checkout from '@/components/Checkout'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'layout',
          component: Layout,
          redirect: '/index',
          children: [
            {
              path: 'index',
              name: 'Products',
              component: Products,
            }
          ]
        },
        {
          path: '/checkout',
          name: 'Checkout',
          component: Checkout
        },
    ]
})
