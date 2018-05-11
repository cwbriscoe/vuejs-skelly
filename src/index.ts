import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = true;

/* eslint-disable no-new */
const v = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
