import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Topindex from '@/components/Topindex'
import show from '@/components/show'
import allDetail from '@/components/allDetail'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'Index',
      component: Topindex
    },
    {
      path: '/detail',
      name: 'Detail',
      component: allDetail
    },
    {
      path: '/show',
      name: 'show',
      component: show
    },
  ]
})
