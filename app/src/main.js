import Vue from 'vue'
//引入Element-ui
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import store from '@/store'

Vue.config.productionTip = false
Vue.use(ElementUI)



new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
