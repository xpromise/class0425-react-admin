import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const Item = Form.Item;
const Option = Select.Option;

@Form.create()
class AddUserForm extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired,
  };

  render () {
    const { form : { getFieldDecorator }, roles } = this.props;

    return (
      <Form>
        <Item label='用户名' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'username',
              {
                rules: [
                  {required: true, message: '必须输入内容'}
                ]
              }
            )(
              <Input placeholder='请输入用户名'/>
            )
          }
        </Item>
        <Item label='密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'password',
              {
                rules: [
                  {required: true, message: '必须输入内容'}
                ]
              }
            )(
              <Input placeholder='请输入密码' type='password'/>
            )
          }
        </Item>
        <Item label='手机号' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'phone',
              {
                rules: [
                  {required: true, message: '必须输入内容'}
                ]
              }
            )(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'email',
              {
                rules: [
                  {required: true, message: '必须输入内容'}
                ]
              }
            )(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'roleId',
              {
                rules: [
                  {required: true, message: '必须输入内容'}
                ]
              }
            )(
              <Select placeholder='请选择角色'>
                {
                  roles.map((role) => {
                    return <Option key={role._id} value={role._id}>{role.name}</Option>
                  })
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddUserForm;