import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Admin from './containers/admin';
import Login from './containers/login';

import checkLogin from './containers/check-login';

import './App.css';

export default class App extends Component {
  render() {
    return <Router>
      {/*
        Switch 切换，只显示匹配上的第一个路由组件，后面的就不看了
      */}
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={checkLogin(Admin)}/>
      </Switch>
    </Router>;
  }
}