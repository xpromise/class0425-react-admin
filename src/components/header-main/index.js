import React, { Component } from 'react';
import { Button, Modal, message } from 'antd';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import { removeItem } from '../../utils/storage';
import data from '../../utils/store';
import { menuList } from '../../config';
import { reqWeather } from '../../api';

import './index.less';

class HeaderMain extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      time: this.getTime(),
      weather: '晴',
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png'
    };
  }

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

  // 初始化和更新都会走的生命周期函数
  static getDerivedStateFromProps(nextProps, prevState) {
    let { pathname } = nextProps.location;

    /*if (pathname === '/') {
      return {
        title: '首页'
      }
    }*/

    if (pathname.startsWith('/product')) {
      pathname = '/product'
    }

    // 生成title
    // menuList.find()  map()
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if (menu.children) {
        const children = menu.children;
        for (let j = 0; j < children.length; j++) {
          const cMenu = children[j];
          if (cMenu.key === pathname) {
            // 返回新状态，自动更新状态
            return {
              title: cMenu.title
            }
          }
        }
      } else {
        if (menu.key === pathname) {
          // 返回新状态，自动更新状态
          return {
            title: menu.title
          }
        }
      }
    }

    // 默认返回值, 如果以上都不匹配，会被跳转到/home
    return {
      title: '首页'
    }
  }

  getTime = () => dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

  componentDidMount() {
    // 开启定时器
    this.timer = setInterval(() => {
      // 更新状态
      this.setState({
        time: this.getTime()
      })
    }, 1000)
    // 请求天气
    reqWeather('深圳')
      .then((res) => {
        message.success('更新天气成功', 3);
        this.setState(res);
      })
      .catch((err) => {
        message.error(err, 3);
      })
  }

  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.timer);
  }

  render() {
    const { title, time, weather, dayPictureUrl } = this.state;

    return <div className="header-main">
      <div className="header-main-top">
        <span>欢迎，{data.user.username}</span>
        <Button type="link" onClick={this.logout}>退出</Button>
      </div>
      <div className="header-main-bottom">
        <h3>{title}</h3>
        <div>
          <span>{time}</span>
          <img src={dayPictureUrl} alt="weather"/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(HeaderMain);