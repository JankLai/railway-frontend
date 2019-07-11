import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//boostrap ui
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//fontawesome icons
import fontawesome from '@fortawesome/fontawesome'

import solid from '@fortawesome/fontawesome-free-solid'


fontawesome.library.add(solid)


// import './assets/sass/index.sass'
//cnpm i vue bootstrap-vue bootstrap
//cnpm install node-sass@4.12.0

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
