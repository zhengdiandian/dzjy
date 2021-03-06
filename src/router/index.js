import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/main'
import Broadcast from '@/components/broadcast'
import Sell from '@/components/sell'
import Transaction from '@/components/transaction'
import Guidance from '@/components/guidance'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      // redirect: '/index/EOS'
      component: Guidance
    },
    {
      path: '/index/:type',
      name: 'index',
      component: Main,
      props: true,
    },
    {
        path:'/broadcast/:id',
        name: 'broadcast',
        props: true,
        component:
         Broadcast,
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/transaction',
      name: 'transaction',
      component:Transaction,
      meta: {
        keepAlive: true
      }
    }
  ]
})
