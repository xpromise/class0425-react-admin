import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const { Option } = Select;
const { Item } = Form;

class AddCategoryForm extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  render() {
    const { categories, form : { getFieldDecorator } } = this.props;

    return <Form>
      <Item label="所属分类">
        {
          getFieldDecorator(
            'parentId',
            {
              initialValue: '0'
            }
          )(
            <Select>
              <Option key="0" value="0">一级分类</Option>
              {
                categories.map((category) => {
                  return <Option key={category._id} value={category._id}>{category.name}</Option>
                })
              }
            </Select>
          )
        }
      </Item>
      <Item label="分类名称">
        {
          getFieldDecorator(
            'categoryName',
            {
              rules: [
                { required: true, message: '请输入分类名称' }
              ]
            }
          )(
            <Input placeholder="请输入分类名称"/>
          )
        }
      </Item>
    </Form>;
  }
}
// 为了给AddCategoryForm传递一个form属性
export default Form.create()(AddCategoryForm);