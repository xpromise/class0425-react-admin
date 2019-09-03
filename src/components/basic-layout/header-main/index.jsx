import React, { Component } from 'react';
import { Button, Modal, message, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import screenfull from 'screenfull';

import { connect } from 'react-redux';
// webpack alias语法： 优点：可以简化路径  缺点：没有提示
import { removeUser } from '@actions/user';
import menuList from '@config/menus';

import './index.less';

@connect(
  (state) => ({username: state.user.data.username}),
  { removeUser }
)
@withRouter
@withTranslation()
class HeaderMain extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      time: this.getTime(),
      lang: 'English',
      isScreenFull: false
    };
  }

  // 退出登录功能
  logout = () => {
    const { t } = this.props;

    Modal.confirm({
      title: t('admin.logoutText'),
      // content: 'Some descriptions',
      okText: t('admin.okText'),
      cancelText: t('admin.cancelText'),
      onOk: () => {
        // 移除用户数据 （本地 / 内存）
        this.props.removeUser();
        // 退出登录成功
        message.success('退出登录成功', 3);
        // 跳转到登录页面
        this.props.history.replace('/login');
      },
    });
  };

  // 初始化和更新都会走的生命周期函数
  static getDerivedStateFromProps(nextProps, prevState) {
    let { pathname } = nextProps.location;

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
      title: 'route.dashboard'
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
    }, 1000);

    screenfull.on('change', () => {
      // 切换状态
      this.setState({
        isScreenFull: !this.state.isScreenFull
      })
    });
  }

  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.timer);
  }

  changeLang = () => {
    const isEn = this.state.lang === 'English';

    this.setState({
      lang: isEn ? '中文' : 'English'
    });

    this.props.i18n.changeLanguage(isEn ? 'en' : 'zh');
  };

  changeFullscreen = () => {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  };

  render() {
    const { title, time, lang, isScreenFull } = this.state;
    const { t } = this.props;

    return <div className="header-main">
      <div className="header-main-top">
        <Button size="small" onClick={this.changeFullscreen}><Icon type={isScreenFull ? 'fullscreen-exit' : 'fullscreen'} /></Button> &nbsp;
        <Button size="small" onClick={this.changeLang}>{lang}</Button> &nbsp;
        <span>{t('admin.header')}{this.props.username}</span>
        <Button type="link" onClick={this.logout}>{t('admin.btnText')}</Button>
      </div>
      <div className="header-main-bottom">
        <h3>{t(title)}</h3>
        <span>{time}</span>
      </div>
    </div>;
  }
}

export default HeaderMain;