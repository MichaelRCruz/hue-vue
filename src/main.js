// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  // works in developmemt mode with webpack, but the server will need to be configured to return all cases
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
