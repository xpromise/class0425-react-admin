import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const { Item } = Form;

class UpdateCategoryNameForm extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  };

  validator = (rule, value, callback) => {
    if (!value) {
      callback('请输入修改的分类名称, 不能为空');
    } else if (value === this.props.category.name) {
      callback('输入名称不能相同~');
    } else {
      callback();
    }
  };

  render() {
    const { category : { name } , form : { getFieldDecorator } } = this.props;

    return <Form >
      <Item>
        {
          getFieldDecorator(
            'categoryName',
            {
              initialValue: name,
              rules: [
                { validator: this.validator }
              ]
            }
          )(
            <Input />
          )
        }
      </Item>
    </Form>;
  }
}

export default Form.create()(UpdateCategoryNameForm);