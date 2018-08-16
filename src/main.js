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
  baseURL: 'http://localhost:3000/api/v1'
})
Vue.use(elementUi)
Vue.config.productionTip = false

Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length))+'s';
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return {
      markets: []
    }
  },
  created(){
    this.axios.post('/getMarketsList').then(response => {
      console.log('market',response)
      
      this.markets = response.data.markets
      // this.marketID = response.data.markets[this.marketIndex].markets_id
      // this.$route.params.markets_id = this.marketID
      // Vue.prototype.markets = response.data.markets
  })
  }
})
