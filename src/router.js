import Vue from 'vue'
import Router from 'vue-router'
import Chart from './views/Chart.vue'
import Search from './views/Search.vue'
import Upload from './views/Upload.vue'
import Analyze from './views/Analyze.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Chart
    },
    {
      path: '/charts',
      name: 'charts',
      component: Chart,
      meta: { transition: 'zoom' },
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    }
  ]
})
