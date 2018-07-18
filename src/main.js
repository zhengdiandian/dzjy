// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Axios from 'axios'
import Footer from './components/footer'
import Header from './components/header'

Vue.component('my-header', Header)
Vue.component('my-footer', Footer)

Vue.prototype.axios = Axios.create({
  baseURL: 'http://192.168.3.193:8999'
})
Vue.use(elementUi)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
