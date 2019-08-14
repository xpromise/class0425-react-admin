import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import data from '../../utils/store';
import { getItem } from '../../utils/storage';

export default class Admin extends Component {

  render() {
    // console.log('user', data.user);
    // 判断内存有没有数据
    if (!data.user._id) {
      // 判断本地有没有数据
      const user = getItem();
      if (!user) {
        // 内存和本地都没有值
        return <Redirect to="/login"/>;
      }
      // 如果内存没有值但本地有值，先存在内存中，在使用
      data.user = user;
      // 没有登录过, 返回登录
      // 路由链接跳转
      // 下面这种方式不行。render方法必须有一个返回值，得是虚拟DOM对象
      // return this.props.history.replace('/login');
    }

    return <div>
      Admin
    </div>;
  }
}