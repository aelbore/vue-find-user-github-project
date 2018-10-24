import Vue from 'vue'

import router from './route';

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

new Vue({
  router,
  template: `
    <div id='app'>
      <router-view></router-view>
    </div> 
  `
}).$mount('#app')
