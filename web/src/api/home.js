import request from './../util/request.js'


// 发送短信
// url: '/user/valid_code?phoneNum=' + this.phone,

export function valid_code(data) {
  return request({
    url: '/user/valid_code?phoneNum=' + data.phoneNum,
    method: 'POST',
    data
  })
}


// 注册	

export function register(data) {
  return request({
    url: '/user/register',
    method: 'POST',
    data
  })
}


// 登录
export function logins(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 查询 个人信息

export function user(data) {
  return request({
    url: '/user',
    method: 'GET',
    data
  })
}

// 修改 邮箱

// / 	url: '/user/email?email=' + this.email,


export function email(data) {
  return request({
    url: '/user/email?email=' + data.email,
    method: 'POST',
    data: {}

  })
}



// 查询下级
export function invitation(data) {
  return request({
    url: 'user/invitation',
    method: 'GET',
    data: data

  })
}

// 查询使用帮助


export function exec(data) {
  return request({
    url: '/script/exec/?pageNum=1&pageSize=1000',
    method: 'GET',
    data: data

  })
}

export function order(data){
  return request({
    url: '/member/order',
    method: 'POST',
    data: data
  })
}
