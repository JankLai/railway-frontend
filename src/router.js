import Vue from 'vue'
import Router from 'vue-router'
import Chart from './views/Chart.vue'
import Search from './views/Search.vue'
import Upload from './views/Upload.vue'
import Analyze from './views/Analyze.vue'
import Map from './views/Map.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/charts',
      name: 'charts',
      component: Chart,
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: Analyze
    },
    {
      path: '/map',
      name: 'map',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Map
    }
  ]
})
