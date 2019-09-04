import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tree } from 'antd';
import { withTranslation } from 'react-i18next';

import menuList from '@config/menus';

const Item = Form.Item;
const { TreeNode } = Tree;

@Form.create()
@withTranslation()
class UpdateRoleForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  treeData = [
    {
      title: '平台权限',
      key: '/',
      children: menuList.map((menu) => {
        const data = {
          title: menu.title,
          key: menu.key
        };

        if (menu.children) {
          data.children = menu.children.map((cMenu) => {
            return {
              title: cMenu.title,
              key: cMenu.key
            }
          })
        }

        return data;
      })
    }
  ];

  renderTreeNodes = data => {
    const { t } = this.props;
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={t(item.title)} key={item.key} dataRef={item}>
            {
              this.renderTreeNodes(item.children)
            }
          </TreeNode>
        );
      }
      return <TreeNode title={t(item.title)} key={item.key}/>;
    })
  };

  render () {
    const { form : { getFieldDecorator }, name } = this.props;

    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: name
              }
            )(
              <Input placeholder='请输入角色名称' disabled/>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator(
              'menus',
              {
                rules: [
                  { required: true, message: '请选择角色' }
                ],
                valuePropName: 'checkedKeys', // 子节点的值的属性
                trigger: 'onCheck', // 收集子节点的值的时机
                validateTrigger: 'onCheck' // 校验子节点值的时机
              }
            )(
              <Tree
                checkable
                // onCheck={this.onCheck}
                // checkedKeys={this.state.checkedKeys}
                defaultExpandAll={true}
              >
                {
                  this.renderTreeNodes(this.treeData)
                }
              </Tree>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default UpdateRoleForm;