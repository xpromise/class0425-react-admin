
import {
  LOGIN_SUCCESS,
  REMOVE_USER,
} from '../action-types/user';

import { getItem, setItem, removeItem } from '@utils/storage';

const userData = getItem('user');
const token = getItem('token');
// 初始化用户数据
const initUser = {
  hasLogin: userData.username && token,
  data: userData,
  token: token
};

function user(prevState = initUser, action) {
  switch (action.type) {
    case LOGIN_SUCCESS :
      const { user, token } = action.data;
      // 保存在本地
      setItem('user', user);
      setItem('token', token);
      // 更新state
      return {
        hasLogin: true,
        data: user,
        token
      };
    case REMOVE_USER :
      removeItem('user');
      removeItem('token');
      return {
        hasLogin: false,
        data: {},
        token: ''
      };
    default :
      return prevState;
  }
}

export default user;