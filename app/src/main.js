import Vue from 'vue'
//引入Element-ui
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
//引入路由
import router from '@/router'

import store from '@/store'

Vue.config.productionTip = false
Vue.use(ElementUI)



new Vue({
  //注册vuex
  store,
  //注册路由
  router,
  render: h => h(App),
}).$mount('#app')
