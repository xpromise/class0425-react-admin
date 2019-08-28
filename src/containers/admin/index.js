import React, { Component, lazy, Suspense } from 'react';
import { message, Spin, Layout } from 'antd';
import { Link, Route, Redirect, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { saveUser } from '../../redux/action-creators';

import LeftNav from '../left-nav';
import HeaderMain from '../header-main';
// import Home from '../home';
// import Category from '../category';
// import Product from '../product';
// import User from '../user';
// import Role from '../role';
// import Line from '../charts/line';
// import Bar from '../charts/bar';
// import Pie from '../charts/pie';

import { reqValidateUser } from '../../api';
// import data from '../../utils/store';
import { getItem } from '../../utils/storage';

import logo from '../../assets/images/logo.png';
import './index.less';

const Home = lazy(() => import(/* webpackChunkName: "home", webpackPrefetch: true */'../../pages/home'));
const Category = lazy(() => import(/* webpackChunkName: "category", webpackPrefetch: true */'../category'));
const Product = lazy(() => import(/* webpackChunkName: "product", webpackPrefetch: true */'../../pages/product'));
const User = lazy(() => import(/* webpackChunkName: "user", webpackPrefetch: true */'../user'));
const Role = lazy(() => import(/* webpackChunkName: "role", webpackPrefetch: true */'../role'));
const Line = lazy(() => import(/* webpackChunkName: "line", webpackPrefetch: true */'../../pages/charts/line'));
const Bar = lazy(() => import(/* webpackChunkName: "bar", webpackPrefetch: true */'../../pages/charts/bar'));
const Pie = lazy(() => import(/* webpackChunkName: "pie", webpackPrefetch: true */'../../pages/charts/pie'));

const { Header, Content, Footer, Sider } = Layout;

class Admin extends Component {
  state = {
    // isLoading: true,
    collapsed: false,
    isDisplay: 'block',
    menus: []
  };

  /**
   * 检查用户是否有进行登录
   * @returns {boolean|*}
   */
  checkUserLogin = () => {
    // 判断内存有没有数据
    if (!this.props.user._id) {
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
          // 验证通过。保存在redux中
          this.props.saveUser(user);
          // 更新状态，显示admin页面
          this.setState({
            // isLoading: false
            menus: user.role.menus
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

    const { isDisplay, collapsed, menus } = this.state;

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
              <Suspense fallback={<Spin className="admin-loading" tip="loading...." size="large"/>}>
                {
                  menus.map((menu, index) => {
                    switch (menu) {
                      case '/home' :
                        return <Route key={index} path="/home" component={Home}/>;
                      case '/category' :
                        return <Route key={index} path="/category" component={Category}/>;
                      case '/product' :
                        return <Route key={index} path="/product" component={Product}/>;
                      case '/user' :
                        return <Route key={index} path="/user" component={User}/>;
                      case '/role' :
                        return <Route key={index} path="/role" component={Role}/>;
                      case '/charts/bar' :
                        return <Route key={index} path="/charts/bar" component={Bar}/>;
                      case '/charts/line' :
                        return <Route key={index} path="/charts/line" component={Line}/>;
                      case '/charts/pie' :
                        return <Route key={index} path="/charts/pie" component={Pie}/>;
                      default :
                        return null;
                    }
                  })
                }
                <Redirect to="/home"/>
              </Suspense>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>;
  }
}

/******* redux ********/
export default connect(
  (state) => ({user: state.user}),
  { saveUser }
)(Admin)