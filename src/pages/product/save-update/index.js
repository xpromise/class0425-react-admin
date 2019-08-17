import React, { Component, Fragment } from 'react';
import { Card, Icon, Form, Input, Cascader, InputNumber, Button, message } from 'antd';

import { reqGetCategory } from '../../../api';

import './index.less';

const { Item } = Form;

class SaveUpdate extends Component {
  state = {
    options: []
  };

  submit = (e) => {
    e.preventDefault();

  };

  componentDidMount() {
    reqGetCategory(0)
      .then((res) => {
        this.setState({
          options: res.map((category) => {
            return {
              label: category.name,
              value: category._id,
              isLeaf: false // 设置加载二级菜单
            }
          })
        })
      })
      .catch((error) => {
        message.error(error, 3)
      })
  }

  loadData = (selectedOptions) => {
    // 找到最后一级菜单对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 给最后一级菜单对象添加了loading属性 --> 加载中图标显示
    targetOption.loading = true;

    // 发送请求，请求二级分类数据
    reqGetCategory(targetOption.value)
      .then((res) => {
        // 不要loading图标
        targetOption.loading = false;
        if (res.length === 0) {
          targetOption.isLeaf = true;
        } else {
          targetOption.children = res.map((category) => {
            return {
              label: category.name,
              value: category._id,
            }
          });
        }
        // 更新状态 -- 重新渲染组件 -- 从而看到最新的二级分类
        this.setState({
          options: [...this.state.options],
        });
      })
      .catch(() => {
        message.error('加载二级列表失败', 3);
      });

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { options } = this.state;

    return <Card title={<Fragment><Icon type="arrow-left"/>&nbsp;&nbsp;添加商品</Fragment>}>
      <Form labelCol={{span: 2}} wrapperCol={{span: 8}} onSubmit={this.submit}>
        <Item label="商品名称">
          {
            getFieldDecorator(
              'name',
              {
                rules: [
                  {required: true, message: '输入内容不能为空'}
                ]
              }
            )(
              <Input placeholder="请输入商品名称"/>
            )
          }
        </Item>
        <Item label="商品描述">
          {
            getFieldDecorator(
              'desc',
              {
                rules: [
                  {required: true, message: '输入内容不能为空'}
                ]
              }
            )(
              <Input placeholder="请输入商品描述"/>
            )
          }
        </Item>
        <Item label="商品分类">
          {
            getFieldDecorator(
              'id',
              {
                rules: [
                  {required: true, message: '输入内容不能为空'}
                ]
              }
            )(
              <Cascader
                options={options}
                loadData={this.loadData}
              />
            )
          }
        </Item>
        <Item label="商品价格">
          {
            getFieldDecorator(
              'price',
              {
                rules: [
                  {required: true, message: '输入内容不能为空'}
                ]
              }
            )(
              <InputNumber
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                // onChange={onChange}
                className="save-update-input"
              />
            )
          }
        </Item>
        <Item label="商品详情">
        </Item>
        <Item>
          <Button className="save-update-btn" type="primary" htmlType="submit">提交</Button>
        </Item>
      </Form>
    </Card>;
  }
}

export default Form.create()(SaveUpdate);