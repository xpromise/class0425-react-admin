import axios from 'axios';
import store from '../redux/store';
import NProgress from 'nprogress';
// 颜色可以强行修改~
import 'nprogress/nprogress.css';

import { getItem } from '../utils/storage';
import { BASE_URL } from '../config';

// 创建axios的实例
const axiosInstance = axios.create({
  baseURL: BASE_URL + '/api/',
  timeout: 10000,
  /*headers: {
    'X-Custom-Header': 'xxx'
  }*/
});

axiosInstance.interceptors.request.use(
  // 发送请求之前的回调
  (config) => {
    const token = store.getState().user.token || getItem();

    if (token) {
      // token前面加上 Bearer 不是必须的，看公司要求~
      // 但是不加Bearer，记得后台代码也需要修改~
      config.headers['authorization'] = `Bearer ${token}`;
    }

    NProgress.start();

    return config;
  },
  // 发送请求失败的回调
  (error) => {
    NProgress.done();

    console.log('请求失败~', error);
    // 响应失败、网络错误
    return Promise.reject('网络出现故障，请刷新试试');
  }
);

// 响应拦截器：用来处理响应
axiosInstance.interceptors.response.use(
  // 响应成功的回调
  (response) => {
    // 2. 成功由then触发 失败由catch触发
    // 3. 成功只需要成功的数据  失败只需要失败的错误信息
    const result = response.data;

    NProgress.done();

    if (result.status === 0) {
      // 请求成功
      // 默认返回的成功的promise
      return result.data || {};
    } else {
      // 请求失败
      // 返回失败的promise
      return Promise.reject(result.msg || '未知错误~~~');
    }
  },
  // 响应失败的回调
  (error) => {
    NProgress.done();

    console.log('请求失败~', error);
    // 响应失败、网络错误
    return Promise.reject('网络出现故障，请刷新试试');
  }
);

// 暴露出去
export default axiosInstance;