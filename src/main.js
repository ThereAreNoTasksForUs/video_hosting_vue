import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.$cookies.config('7d')

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
