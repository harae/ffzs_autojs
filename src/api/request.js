import axios from 'axios'
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui'

let loadingInstance
const loading = {
  open: function() {
    if (this.loadingInstance == null) {
      this.loadingInstance = Loading.service({
        target: 'main',
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.5)'
      })
    }
  },
  close: function() {
    if (this.loadingInstance != null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  }
}

const instance = axios.create({
  baseURL: 'http://101.132.186.176:8083',
  // baseURL: 'http://localhost:8083',
  timeout: 50000, //请求超时5s
})

instance.interceptors.request.use(
  config => {
    loading.open()
    //将token信息带进header中
    config.headers.Authorization = localStorage.getItem('loginsystemtoken')
    return config
  },
  error => {
    loading.close()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    loading.close()
    const res = response.data
    console.log(res)
    if(!res.state){
      if(res.code == "400"){
        MessageBox.alert(res.message, "", {
          confirmButtonText: "跳转登录页面",
          callback: action => {
            // 跳转登录页
            window.location.href = "/login";
          }
        });
      }
    }
    return response
  },
  error => {
    loading.close()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default instance
