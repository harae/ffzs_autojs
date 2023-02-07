import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import index from '@/view/index'


import my from '@/view/my'
import binemail from '@/view/binemail'
import details from '@/view/details'
import help from '@/view/help'
import invitation from '@/view/invitation'
import vip from '@/view/vip'
import home from '@/view/home'






Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component:index
    },
    {
      path: '/my',
      name: 'my',
      component:my
    },
    {
      path: '/binemail',
      name: 'binemail',
      component:binemail
    },
    {
      path: '/details',
      name: 'details',
      component:details
    },
    {
      path: '/help',
      name: 'help',
      component:help
    },
    {
      path: '/home',
      name: 'home',
      component:home
    },
    {
      path: '/invitation',
      name: 'invitation',
      component:invitation
    },
    {
      path: '/vip',
      name: 'vip',
      component:vip
    }
  ]
})
