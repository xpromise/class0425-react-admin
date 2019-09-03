import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';
import { loginAsync } from '@actions/user';

import logo from '../../assets/images/logo.png';

import './index.less';
// 定义变量，不能写在import上面，会报eslint的错误
const Item = Form.Item;

@connect(
  null,
  { loginAsync }
)
@withTranslation()
@Form.create()
class Login extends Component {

  /**
   * 用来表单校验
   * @param rule
   * @param value
   * @param callback
   */
  validator = (rule, value, callback) => {
    /*
      rule 通过这个参数能知道是哪个Input组件进行表单校验
      value 校验的值是多少
      callback
        callback() 代表表单校验成功
        callback(errMsg) 代表表单校验失败，失败的提示就是errMsg
     */
    // console.log(rule, value);
    const name = rule.field === 'username' ? '用户名' : '密码';
    const passwordReg = /^\w+$/;

    if (!value) {
      callback('输入的内容不能为空');
    } else if (value.length < 3) {
      callback(`${name}长度必须大于3位`);
    } else if (value.length > 10) {
      callback(`${name}长度必须小于10位`);
    } else if (!passwordReg.test(value)) {
      callback(`${name}只能包含英文、数字、下划线`);
    }

    // 校验成功
    callback();
  };
  /**
   * 用来登录
   */
  login = (e) => {
    // 禁止默认行为
    e.preventDefault();
    // 表单校验成功才能登录
    this.props.form.validateFields((err, values) => {
      /*
        err 表单校验失败的错误
        values 表单输入的值
      */
      if (!err) {
        // 没有错误，校验成功。允许登录
        const { username, password } = values;

        this.props.loginAsync(username, password);
        // 重置密码
        this.props.form.resetFields(['password']);
      }
    })
  };

  render() {
    // 提取一个方法：用于表单校验
    // getFieldDecorator方法就是一个高阶组件
    const { getFieldDecorator } = this.props.form;

    const { t } = this.props;

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>{t('login.title')}</h1>
      </header>
      <section className="login-section">
        <h2>{t('login.logTitle')}</h2>
        <Form onSubmit={this.login}>
          <Item>
            {
              getFieldDecorator(
                'username', // input的标识，今后获取input的值，就从username
                {
                  rules: [ // 表单校验规则
                    { validator: this.validator }
                  ]
                }
              )(
                <Input prefix={<Icon type="user" />} placeholder={t('login.username')}/>
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules: [
                    { validator: this.validator }
                  ]
                }
              )(
                <Input type="password" prefix={<Icon type="lock" />} placeholder={t('login.password')}/>
              )
            }
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">{t('login.btn')}</Button>
          </Item>
        </Form>
      </section>
    </div>;
  }
}

export default Login;
