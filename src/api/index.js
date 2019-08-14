import axiosInstance from './ajax';

// 定义登录请求方法
export const reqLogin = (username, password) => axiosInstance.post('/login', {username, password});

// 定义验证用户信息的方法
export const reqValidateUser = (id) => axiosInstance.post('/validate/user', {id});