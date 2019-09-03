import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// 不需要登录路径
import { UN_LOGIN_PATH } from '../../config';
import { checkProductRoute } from '@utils/tools';


function AuthRoute(props) {

  let {
    // 普通解构赋值
    hasLogin,
    menus,
    // 对component进行解构赋值，在重命名为Component
    component: Component,
    // 对location进行解构赋值, 在对pathname进行解构赋值
    location : { pathname },
    // 读取剩下所有参数
    ...rest
  } = props;

  if (UN_LOGIN_PATH.indexOf(pathname) === -1) {
    // 没有命中, 说明地址不是 /login
    // 没有登录就去 /login 页面
    if (!hasLogin) return <Redirect to="/login"/>;
    // 看有没有权限访问 --> 权限管理功能
    pathname = checkProductRoute(pathname);
    if (menus.indexOf(pathname) === -1) {
      return <Redirect to="/" />;
    }
    // 都没有问题就返回组件
    return <Route {...rest} render={(props) => {
      return <Component {...props}/>
    }}/>
  }
  // 命中了, 说明地址是 /login
  // 登录过就去 / 页面，没有登录才需要登录
  return hasLogin ? <Redirect to="/"/> : <Route {...rest} render={(props) => {
    return <Component {...props}/>
  }}/>
}

export default connect(
  (state) => ({
    hasLogin: state.user.hasLogin,
    menus: state.user.data.menus
  })
)(withRouter(AuthRoute));