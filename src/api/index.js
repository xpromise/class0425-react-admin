import axiosInstance from './ajax';

// 定义登录请求方法
export const reqLogin = (username, password) => axiosInstance.post('/login', {username, password});