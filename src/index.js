import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store/store';
import VueMask from 'v-mask'
import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.use(VueMask);
new Vue({
  store,
  vuetify,
  router:router,
  el: '#app',
  render: h => h(App)
})
