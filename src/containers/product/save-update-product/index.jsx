import React, { Component, Fragment } from 'react';
import { Card, Form, Icon, Input, InputNumber, Cascader, Button, message } from 'antd';

import { connect } from 'react-redux';
import { getCategoryAsync } from '@actions/category';
import { reqAddProduct, reqUpdateProduct } from '@api';

import RichTextEditor from '../rich-text-editor';
// import PictureWall from '../picture-wall';

const { Item } = Form;

@connect(
  (state) => ({categories: state.categories}),
  { getCategoryAsync }
)
@Form.create()
class SaveUpdate extends Component {
  state = {
    options: []
  };

  // pictureWallRef = React.createRef();

  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoryAsync();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.options.length || !nextProps.categories.length) return prevState;

    return {
      options: nextProps.categories.map((category) => {
        return {
          label: category.name,
          value: category._id,
        }
      })
    }
  }

  submit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const { state } = this.props.location;
        const { name, desc, price, categoryId, detail } = values;

        let promise = null;

        if (state) {
          promise = reqUpdateProduct({ productId: state._id, name, desc, price, detail, categoryId: categoryId[0] })
        } else {
          promise = reqAddProduct({ name, desc, price, detail, categoryId: categoryId[0] })
        }

        promise
          .then((res) => {
            message.success(`${state ? '更新' : '添加'}商品成功`);
          })
          .catch((err) => {
            message.error(err);
          })
          .finally(() => {
            this.props.history.push('/product');
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

  goBack = () => {
    this.props.history.push('/product');
  };

  render() {
    const { form : { getFieldDecorator }, location : { state } } = this.props;
    const { options } = this.state;

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
              'categoryId',
              {
                rules: [
                  {required: true, message: '输入内容不能为空'}
                ],
                initialValue: state ? [state.categoryId] : []
              }
            )(
              <Cascader
                options={options}
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
        {/*<Item label="商品图片" wrapperCol={{span: 20}}>
          {
            getFieldDecorator(
              'images',
            )(
              <PictureWall images={isUpdateProduct ? state.images : []} ref={this.pictureWallRef}/>
            )
          }
        </Item>*/}
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

export default SaveUpdate;