import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const ReadmeLazyComponent = () => import('./components/readme/readme.vue');
const SearchLazyComponent = () => import('./components/search/search.vue');

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'search', component: SearchLazyComponent },
    { path: '/readme/:username/:repo', name: 'readme', component: ReadmeLazyComponent, props: true }
  ]
})