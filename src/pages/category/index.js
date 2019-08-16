import React, { Component, Fragment } from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';

import { reqGetCategory, reqAddCategory } from '../../api';
import AddCategoryForm from './add-category-form';

import './index.less';

export default class Category extends Component {
  state = {
    categories: [],
    isShowAddCategory: false,
  };

  addCategoryFormRef = React.createRef()

  componentDidMount() {
    // 请求一级分类数据
    reqGetCategory(0)
      .then((res) => {
        this.setState({
          categories: res
        })
      })
      .catch((error) => {
        message.error(error, 3);
      })
  }

  // 列的数据
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
      // render: text => <a>{text}</a>, // 默认是纯文本，如果要加上指定标签，就得render方法
    },
    {
      title: '操作', // 列的标题
      className: 'column-operation',  // 列的类名
      dataIndex: 'operation', // 要显示数据的属性名相关
      render: () => {
        return <Fragment>
          <Button type="link">修改名称</Button>
          <Button type="link">查看其子品类</Button>
        </Fragment>
      }
    }
  ];

  showAddCategory = () => {
    this.setState({
      isShowAddCategory: true
    })
  };

  cancel = () => {
    this.setState({
      isShowAddCategory: false
    })
  };

  addCategory = () => {
    // 获取子组件的form属性 --> ref
    // ref 如果设置的是 普通虚拟DOM对象 得到的是真实DOM元素
    // ref 如果设置的是 组件 得到的是组件的实例对象
    // console.log(this.addCategoryFormRef.current);
    // 进行表单校验
    this.addCategoryFormRef.current.validateFields((err, values) => {
      if (!err) {
        // 表单校验通过
        // 发送请求，请求添加分类
        // console.log(values);
        const { parentId, categoryName } = values;
        reqAddCategory(parentId, categoryName)
          .then((res) => {
            // res就是添加成功的分类数据
            // console.log(res);
            // 需要展示添加成功的分类数据
            this.setState({
              categories: [...this.state.categories, res]
            });
            message.success('添加分类成功~', 3);
          })
          .catch((error) => {
            // 请求失败，提示错误
            message.error(error, 3);
          })
          .finally(() => {
            // 不管成功/失败都会触发
            // 隐藏对话框
            this.setState({
              isShowAddCategory: false
            });
            // 清空表单数据
            this.addCategoryFormRef.current.resetFields();
          })
      }
    })

  };

  render() {
    const { categories, isShowAddCategory } = this.state;

    // 每一行的具体数据
    /*const data = [
      {
        _id: '1',
        categoryName: '手机1111'
      },
      {
        _id: '2',
        categoryName: '手机2222'
      },
      {
        _id: '3',
        categoryName: '手机3333'
      },
      {
        _id: '4',
        categoryName: '手机4444'
      },
    ];*/

    return <Card title="一级分类列表" extra={<Button type="primary" onClick={this.showAddCategory}><Icon type="plus"/>添加品类</Button>}>
      <Table
        columns={this.columns}
        dataSource={categories}
        bordered
        pagination={{
          showQuickJumper: true, // 显示快速跳转
          showSizeChanger: true, // 显示修改每页显示数量
          pageSizeOptions: ['3', '6', '9', '12'], // 修改每页显示数量
          defaultPageSize: 3 // 默认显示数量
        }}
        rowKey="_id"
      />

      <Modal
        title="添加分类"
        visible={isShowAddCategory}
        onOk={this.addCategory}
        onCancel={this.cancel}
        okText="确认"
        cancelText="取消"
      >
        <AddCategoryForm categories={categories} ref={this.addCategoryFormRef}/>
      </Modal>

    </Card>;
  }
}