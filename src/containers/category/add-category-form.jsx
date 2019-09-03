import React, { Component } from 'react';
import { Form, Input } from 'antd';

const { Item } = Form;

@Form.create()
class AddCategoryForm extends Component {

  render() {
    const { form : { getFieldDecorator } } = this.props;

    return <Form>
      <Item label="分类名称" >
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
export default AddCategoryForm;