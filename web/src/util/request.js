
import axios from 'axios'
import { Toast } from 'vant'

var baseApi = 'http://118.31.32.48:8080'



// axios.defaults.baseURL = 'http://118.31.32.48:8080';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';





const service = axios.create({
    baseURL: baseApi,
    withCredentials: false,
    timeout: 5000,

    headers: {
        // 'Content-Type': 'application/json',
        // authentication:window.localStorage.getItem("token")
    }
})


// request拦截器 request interceptor
service.interceptors.request.use(config => {
    console.log('config', config)
    //   config.headers.lang= localStorage.getItem('lang')
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
}, error => {
    console.log(error);
    return Promise.reject(error)
})



var _this = this





// respone拦截器
service.interceptors.response.use(function (response) {
    const res = response.data
    if (![0, 200].includes(res.code)) {
        Toast.fail(res.message);
 
        return Promise.reject(res)

    } else {
        // 成功
        return Promise.resolve(res)
    }
}, error => {
    return Promise.reject(error)
})
export default service
