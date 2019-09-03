import { message } from 'antd';
// 不需要登录路径配置
const UN_LOGIN_PATH = ['/login'];

const isDev = process.env.NODE_ENV === 'development';

// 服务器地址配置
const DEV_URL = 'http://localhost:3000';
const PROD_URL = 'http://localhost:5000';
const BASE_URL = isDev ? DEV_URL : PROD_URL;

// 是否需要调试
const NEED_DEBUG = isDev;

// message的全局配置
message.config({
  duration: 3,
});

export {
  UN_LOGIN_PATH,
  BASE_URL,
  NEED_DEBUG
}