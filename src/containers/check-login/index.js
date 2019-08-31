import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { Redirect } from 'react-router-dom';

import { getUser } from '../../redux/action-creators';
import { getItem } from '../../utils/storage';

export default function CheckLogin(WrappedComponent) {
  return connect(
    (state) => ({token: state.token, user: state.user}),
    { getUser }
  )(
    class extends Component {
        state = {
          isLogin: false,
          goLogin: false
        };

        static getDerivedStateFromProps(nextProps, prevState) {
          let { user, token } = nextProps;

          if (!token) {
            token = getItem();
            if (!token) {
              return {
                goLogin: true
              };
            }
          }

          if (!user.username) {
            // 请求用户数据保存起来
            nextProps.getUser();
            return prevState;
          }

          return {
            isLogin: true
          }
        }

        render() {
          const { isLogin, goLogin } = this.state;

          if (goLogin) return <Redirect to='/login'/>;

          return isLogin ? <WrappedComponent /> : <Spin size="large" />
        }
      }
  )
}

