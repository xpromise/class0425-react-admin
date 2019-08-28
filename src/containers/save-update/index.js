import React, { Component, Fragment } from 'react';
import { Card, Icon, Form, Input, Cascader, InputNumber, Button, message } from 'antd';

import { connect } from 'react-redux';
import { getCategoryAsync } from '../../redux/action-creators';

import RichTextEditor from './rich-text-editor';
import { reqGetCategory, reqAddProduct, reqUpdateProduct } from '../../api';

import './index.less';

const { Item } = Form;

class SaveUpdate extends Component {
  state = {
    options: [],
    id: [],
    subCategories: []
  };

  submit = (e) => {
    e.preventDefault();
    // 表单校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const { name, desc, price, id, detail } = values;

        let pCategoryId, categoryId;
        // 得到categoryId / pCategoryId
        if (id.length === 1) {
          pCategoryId = 0;
          categoryId = id[0];
        } else {
          pCategoryId = id[0];
          categoryId = id[1];
        }
        let promise;
        const { state } = this.props.location;
        if (state) {
          promise = reqUpdateProduct({ _id: state._id, name, desc, price, detail, categoryId, pCategoryId })
        } else {
          promise = reqAddProduct({ name, desc, price, detail, categoryId, pCategoryId })
        }
        // 发送请求，添加商品
        promise
          .then((res) => {
            // 提示成功
            message.success('添加商品成功', 3);
            // 返回Index页面
            this.props.history.push('/product/index');
          })
          .catch(() => {
            message.error('添加商品失败', 3);
          })
      }
    })

  };

  // 自定义收集表单数据
  editorChange = (text) => {
    // 设置表单项的值
    this.props.form.setFields({
      detail: {
        value: text
      }
    });
  };

  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoryAsync(0);
    }

    const { state } = this.props.location;
    if (state && state.pCategoryId !== '0') {
      // 请求二级分类数据
      reqGetCategory(state.pCategoryId)
        .then((res) => {
          this.setState({
            subCategories: res
          })
        })
        .catch((error) => {
          // console.log(error);
          message.error('获取二级分类数据失败~', 3);
        })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { state } = nextProps.location;

    if (prevState.options.length) {
      return prevState;
    }

    if (!state) {
      if (!nextProps.categories.length) {
        return prevState;
      }
      // 数据请求回来了，是添加产品
      return {
        options: nextProps.categories.map((category) => {
          return {
            label: category.name,
            value: category._id,
            isLeaf: false // 设置加载二级菜单
          };
        })
      }
    }

    if (state.pCategoryId !== '0') {
      if (!prevState.subCategories.length) {
        return prevState;
      }
      // 数据回来了，是更新产品，并有二级分类
      return {
        options: nextProps.categories.map((category) => {
          const option = {
            label: category.name,
            value: category._id,
            isLeaf: false // 设置加载二级菜单
          };

          if (category._id === state.pCategoryId) {
            option.children = prevState.subCategories.map((subCategory) => {
              return {
                label: subCategory.name,
                value: subCategory._id,
              }
            })
          }

          return option;
        }),
        id: [state.pCategoryId, state.categoryId]
      };
    } else {
      return {
        options: nextProps.categories.map((category) => {
          return {
            label: category.name,
            value: category._id,
            isLeaf: false // 设置加载二级菜单
          };
        }),
        id: [state.categoryId]
      };
    }
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

  goBack = () => {
    this.props.history.push('/product/index');
  };

  render() {
    const { form: { getFieldDecorator}, location: { state } } = this.props;
    const { options, id } = this.state;

    const isUpdateProduct = !!state;

    return <Card title={<Fragment><Icon onClick={this.goBack} type="arrow-left"/>&nbsp;&nbsp;{ isUpdateProduct ? '修改' : '添加' }商品</Fragment>}>
      <Form labelCol={{span: 2}} wrapperCol={{span: 8}} onSubmit={this.submit}>
        <Item label="商品名称">
          {
            getFieldDecorator(
              'name',
              {
                rules: [
                  {required: true, message: '输入内容不能为空'}
                ],
                initialValue: isUpdateProduct ? state.name : ''
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
                ],
                initialValue: isUpdateProduct ? state.desc : ''
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
                ],
                initialValue: id
              }
            )(
              <Cascader
                options={options}
                loadData={this.loadData}
                placeholder="请选择商品分类"
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
                ],
                initialValue: isUpdateProduct ? state.price : ''
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
        <Item label="商品详情" wrapperCol={{span: 20}}>
          {
            getFieldDecorator(
              'detail',
              {
                rules: [
                  {required: true, message: '输入内容不能为空'}
                ],
              }
            )(
              <RichTextEditor editorChange={this.editorChange} detail={isUpdateProduct ? state.detail : ''}/>
            )
          }
        </Item>
        <Item>
          <Button className="save-update-btn" type="primary" htmlType="submit">提交</Button>
        </Item>
      </Form>
    </Card>;
  }
}

export default connect(
  (state) => ({categories: state.categories}),
  { getCategoryAsync }
)(
  Form.create()(SaveUpdate)
);