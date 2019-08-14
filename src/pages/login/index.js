import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { reqLogin } from '../../api';
import data from '../../utils/store';
import { setItem } from '../../utils/storage';

import logo from '../../assets/images/logo.png';

import './index.less';
// 定义变量，不能写在import上面，会报eslint的错误
const Item = Form.Item;


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
    } else if (value.length < 4) {
      callback(`${name}长度必须大于4位`);
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

        reqLogin(username, password)
          .then((response) => {
            // 请求成功
            // console.log(response);
            // 提示请求成功
            message.success('登录成功~', 3);
            // 存储用户数据到内存中
            data.user = response;
            // 存储用户数据到本地中
            setItem(response);
            // 跳转到admin页面 -- 修改url地址为 /
            // 编程式导航
            this.props.history.replace('/');
            // 下面方式不行
            /*<Redirect to="/login"/>;*/
          })
          .catch((error) => {
            // 请求失败
            message.error(error, 3);
            // 重置密码
            this.props.form.resetFields(['password']);
          })
      }
      // 有错误，方法会自动提示错误
    })
  };

  render() {
    // 提取一个方法：用于表单校验
    // getFieldDecorator方法就是一个高阶组件
    const { getFieldDecorator } = this.props.form;

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-section">
        <h2>用户登录</h2>
        <Form onSubmit={this.login}>
          <Item>
            {/*{
              getFieldDecorator(
                'username', // input的标识，今后获取input的值，就从username
                {
                  rules: [ // 表单校验规则
                    {
                      required: true, // 不能为空，必填
                      message: '请输入用户名' // 错误提示
                    },
                    {
                      min: 4, // 最小位数
                      message: '用户名长度必须大于4位'
                    },
                    {
                      max: 10, // 最大位数
                      message: '用户名长度必须小于10位'
                    },
                    {
                      pattern: /^\w+$/,
                      message: '用户名只能包含英文、数字、下划线'
                    }
                  ]
                }
              )(
                <Input prefix={<Icon type="user" />} placeholder="用户名"/>
              )
            }*/}
            {
              getFieldDecorator(
                'username', // input的标识，今后获取input的值，就从username
                {
                  rules: [ // 表单校验规则
                    { validator: this.validator }
                  ]
                }
              )(
                <Input prefix={<Icon type="user" />} placeholder="用户名"/>
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
                <Input type="password" prefix={<Icon type="lock" />} placeholder="密码"/>
              )
            }
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Item>
        </Form>
      </section>
    </div>;
  }
}

// 高阶组件用法：接收一个Login组件，返回一个新组件
// 新组件就多些form属性。
// 作用：为了给某些传递form属性
// const newLogin = Form.create()(Login);

// export default newLogin;

export default Form.create()(Login);