import axios from "./request"

//封装方法
//1、验证登录用户
export const login=(params)=>{
  return axios({
    url:"/api/login",
    method:"post",
    data:params
  })
}

//2、获取用户列表
export const getUserList=(params)=>{
  return axios({
    url:"/api/getUserList",
    method:"post",
    data:params
  })
}

//3、新增用户
export const addUser=(params)=>{
  return axios({
    url:"/api/addUser",
    method:"post",
    data:params
  })
}

//4、删除用户
export const deleteUser=(params)=>{
  return axios({
    url:"/api/deleteUser",
    method:"post",
    data:params
  })
}

//5、修改用户
export const updateUser=(params)=>{
  return axios({
    url:"/api/updateUser",
    method:"post",
    data:params
  })
}

//5、修改用户
export const getUser=(params)=>{
  return axios({
    url:"/api/getUser",
    method:"post",
    data:params
  })
}
