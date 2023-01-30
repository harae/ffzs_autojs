import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/views/Login'
import Layout from '@/views/Layout'
import UserList from '@/views/UserList'


import Login from '@/views/login/Login'
import Binemail from '@/views/Binemail'
import Details from '@/views/Details'
import Help from '@/views/Help'
import Home from '@/views/Home'
import Index from '@/views/Index'
import Invitation from '@/views/Invitation'
import My from '@/views/My'
import Vip from '@/views/Vip'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },


    {
      path: '/binemail',
      name: 'binemail',
      component: Binemail
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/invitation',
      name: 'invitation',
      component: Invitation
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/vip',
      name: 'vip',
      component: Vip
    },


    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      redirect:'/userlist',
      children: [{
        path: '/userlist',
        name: 'UserList',
        component: UserList
      }]
    }
  ]
})
