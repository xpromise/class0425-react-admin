import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { message, Spin } from 'antd';

import { reqValidateUser } from '../../api';
import data from '../../utils/store';
import { getItem } from '../../utils/storage';

import './index.less';

export default class Admin extends Component {
  state = {
    isLoading: true
  };

  /**
   * 检查用户是否有进行登录
   * @returns {boolean|*}
   */
  checkUserLogin = () => {
    // 判断内存有没有数据
    if (!data.user._id) {
      // 判断本地有没有数据
      const user = getItem();
      if (!user) {
        // 内存和本地都没有值, 返回登录页面
        this.props.history.replace('/login');
        return true;
      }
      // 验证用户信息是否合法
      reqValidateUser(user._id)
        .then(() => {
          // 验证通过。存在内存中，在使用
          data.user = user;
          // 更新状态，显示admin页面
          this.setState({
            isLoading: false
          })
        })
        .catch(() => {
          // 错误提示
          message.error('请先登录', 3);
          // 验证失败
          this.props.history.replace('/login');
        });

      // 需要loading
      return true;
    } else {
      // 不需要loading
      return false
    }
  };

  render() {
    // 登录验证
    const isLoading = this.checkUserLogin();

    if (isLoading) return <Spin className="admin-loading" tip="loading...." size="large"/>;

    return <div>
      admin
    </div>;
  }
}