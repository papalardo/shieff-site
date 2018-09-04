// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import lodash from 'lodash'
import jquery from 'jquery'

window._ = lodash;
window.$ = window.jQuery = jquery;

require('bootstrap/dist/js/bootstrap.bundle.js')
// import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = "http://api.shieff.local/api";

Vue.router = router
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'type'
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
