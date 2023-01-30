import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { request } from "./utils/request.js"

Vue.prototype.$request = request

Vue.config.productionTip = false

//配置element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';//中文
Vue.use(ElementUI, { locale });
axios.defaults.baseURL = 'http://118.31.32.48:8080';

import qs from 'qs';
Vue.prototype.$qs = qs;

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import './assets/global.css'//全局css样式

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


