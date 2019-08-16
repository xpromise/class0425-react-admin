import React, { Component } from 'react';
import { message, Spin, Layout } from 'antd';
import { Link, Route, Redirect, Switch } from 'react-router-dom';

import LeftNav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';
import Home from '../home';
import Category from '../category';
import Product from '../product';
import User from '../user';
import Role from '../role';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Pie from '../charts/pie';

import { reqValidateUser } from '../../api';
import data from '../../utils/store';
import { getItem } from '../../utils/storage';

import logo from '../../assets/images/logo.png';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends Component {
  state = {
    // isLoading: true,
    collapsed: false,
    isDisplay: 'block'
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
            // isLoading: false
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

  // 展开菜单项
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      isDisplay: collapsed ? 'none' : 'block'
    })
  };

  render() {
    // 登录验证
    const isLoading = this.checkUserLogin();

    if (isLoading) return <Spin className="admin-loading" tip="loading...." size="large"/>;

    const { isDisplay, collapsed } = this.state;

    return <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <Link to="/home" className="admin-logo">
          <img src={logo} alt="logo"/>
          <h1 style={{display: isDisplay}}>硅谷后台</h1>
        </Link>
        <LeftNav />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <HeaderMain />
        </Header>
        <Content style={{ margin: '65px 16px 0 16px' }}>
          <div style={{ background: '#fff', minHeight: 360 }}>
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/product" component={Product}/>
              <Route path="/user" component={User}/>
              <Route path="/role" component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/charts/pie" component={Pie}/>
              <Redirect to="/home"/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>;
  }
}