// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
axios.defaults.withCredentials=true;
axios.defaults.baseURL = 'http://118.24.41.50:8083/jwc/'
Vue.config.productionTip = false
import VueSessionStorage from 'vue-sessionstorage'
Vue.use(VueSessionStorage)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})