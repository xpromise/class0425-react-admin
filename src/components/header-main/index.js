import React, { Component } from 'react';
import { Button, Modal, message } from 'antd';
import { withRouter } from 'react-router-dom';

import { removeItem } from '../../utils/storage';
import data from '../../utils/store';

import './index.less';

class HeaderMain extends Component {

  // 退出登录功能
  logout = () => {
    Modal.confirm({
      title: '您确认要退出登录吗?',
      // content: 'Some descriptions',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 移除用户数据 （本地 / 内存）
        removeItem();
        data.user = {};
        // 退出登录成功
        message.success('退出登录成功', 3);
        // 跳转到登录页面
        this.props.history.replace('/login');
      },
      /*onCancel() {
        console.log('Cancel');
      },*/
    });
  };

  render() {
    return <div className="header-main">
      <div className="header-main-top">
        <span>欢迎，{data.user.username}</span>
        <Button type="link" onClick={this.logout}>退出</Button>
      </div>
      <div className="header-main-bottom">
        <h3>xx管理</h3>
        <div>
          <span>xxx时间</span>
          <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
          <span>晴天</span>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(HeaderMain);