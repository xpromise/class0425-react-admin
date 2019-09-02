import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './containers/login';
import NotMatch from './components/not-match';
import BasicLayout from './components/basic-layout';

import routes from './config/routes';
import AuthRoute from "./containers/auth-route";

export default class App extends Component {
  render() {
    return <Router>
      {/* 以下路由只匹配一个 */}
      <Switch>
        {/* 登录路由 */}
        <AuthRoute path="/login" component={Login} />
        {/* 基本layout布局 */}
        <BasicLayout>
          {/* 确保只有一个路由生效 */}
          <Switch>
            {
              routes.map((route, index) => {
                // exact全匹配
                return <AuthRoute
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  key={index}
                />
              })
            }
            {/* 不写path就匹配所有路径 */}
            <Route component={NotMatch}/>
          </Switch>
        </BasicLayout>
      </Switch>
    </Router>;
  }
}