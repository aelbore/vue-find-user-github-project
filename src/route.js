import Vue from 'vue';
import VueRouter from 'vue-router';

import Search from './components/search/search';
import Readme from './components/readme/readme';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'search', component: Search },
    { path: '/readme/:username/:repo', name: 'readme', component: Readme, props: true }
  ]
})