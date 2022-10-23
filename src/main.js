import Vue from 'vue'
import App from './App'
import store from './store'
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'production' ? 'false' : 'true'

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
