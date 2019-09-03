/*
  包含n个创建action对象的工厂函数模块
 */
import { message } from 'antd';

import {
  LOGIN_SUCCESS,
  REMOVE_USER,
} from '../action-types/user';

import {
  reqLogin,
} from '@api';

// 保存用户数据action
const loginSuccess = (data) => ({type: LOGIN_SUCCESS, data});
// 删除用户数据action
export const removeUser = () => ({type: REMOVE_USER});

export const loginAsync = (username, password) => {
  return (dispatch) => {
    reqLogin(username, password)
      .then(({ token, user }) => {
        // 请求成功~ 更新state
        dispatch(loginSuccess({ token, user }));
      })
      .catch((err) => {
        // 请求失败, 提示错误
        message.error(err, 3);
      })
  }
};



