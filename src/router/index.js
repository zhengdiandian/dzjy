import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/main'
import Broadcast from '@/components/broadcast'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index/:type',
      name: 'index',
      component: Main
    },
    {
        path:'/broadcast/',
        name: 'broadcast',
        component:
         Broadcast,
    }
  ]
})
