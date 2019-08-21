import React, { Component, Fragment } from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';

import { connect } from 'react-redux';
import { addCategoryAsync, getCategoryAsync, updateCategoryNameAsync } from '../../redux/action-creators';

import { reqGetCategory, reqAddCategory, reqUpdateCategoryName } from '../../api';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name-form';

import './index.less';

class Category extends Component {
  state = {
    // categories: [],
    subCategories: [],
    category: {},
    subCategory: {},
    isShowAddCategory: false,
    isShowSubCategory: false,
    isShowUpdateCategoryName: false
  };

  addCategoryFormRef = React.createRef();
  updateCategoryNameFormRef = React.createRef();

  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoryAsync(0);
    }
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
      // dataIndex: '_id', // 要显示数据的属性名相关
      render: (category) => {
        // console.log(category);
        /*
          如果有dataIndex，根据它的值来获取要渲染data的对应属性值，放在render方法作为参数传入
          如果没有dataIndex，就会将整个data数据，放在render方法作为参数传入
         */
        return <Fragment>
          <Button type="link" onClick={this.showUpdateCategoryName(category)}>修改名称</Button>
          {
            this.state.isShowSubCategory ? null : <Button type="link" onClick={this.showSubCategory(category)}>查看其子品类</Button>
          }
        </Fragment>
      }
    }
  ];

  showSubCategory = (category) => {
    return () => {
      // 发送请求请求二级分类数据
      reqGetCategory(category._id)
        .then((res) => {
          message.success('获取二级分类成功', 3);
          this.setState({
            isShowSubCategory: true,
            category
          })
        })
        .catch((err) => {
          message.error(err, 3);
        })
    }
  };

  showAddCategory = () => {
    this.setState({
      isShowAddCategory: true
    })
  };

  // 1. 通过闭包保存category数据
  // 2. 点击时将category数据传入form组件中
  showUpdateCategoryName = (category) => {
    return () => {
      // console.log(category);
      const key = +category.parentId === 0 ? 'category' : 'subCategory';

      this.setState({
        isShowUpdateCategoryName: true,
        [key]: category
      });
    }
  };

  cancel = (key) => {
    return () => {

      this.setState({
        [key]: false
      });

      if (key === 'isShowAddCategory') {
        this.addCategoryFormRef.current.resetFields();
      } else {
        this.updateCategoryNameFormRef.current.resetFields();
      }
    }
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

        const isSubCategories = +parentId !== 0;

        if (!isSubCategories) {
          // 添加一级分类数据
          this.props.addCategoryAsync(parentId, categoryName);
        } else {
          reqAddCategory(parentId, categoryName)
            .then((res) => {
              // res就是添加成功的分类数据
              // console.log(res);
              // 需要展示添加成功的分类数据
              const { isShowSubCategory, category } = this.state;
              // const key = isSubCategories ? 'subCategories' : 'categories';
              message.success('添加分类成功~', 3);
              /*
                如果在一级分类：
                  添加一级分类数据，更新 categories
                  添加二级分类数据，不更新
                如果在二级分类
                  添加一级分类数据，更新 categories
                  添加二级分类数据，如果当前的一级分类和要更新的一级分类一样，才更新 subCategories

                  总结：
                    一级分类必须更新
                    二级分类，满足如果当前的一级分类和要更新的一级分类一样，才更新
               */
              if (isShowSubCategory && parentId !== category._id) {
                // 是在一级分类中添加二级分类，不需要更新
                return;
              }

              this.setState({
                subCategories: [...this.state.subCategories, res]
              });
            })
            .catch((error) => {
              // 请求失败，提示错误
              message.error(error, 3);
            })
        }

        // 不管成功/失败都会触发
        // 隐藏对话框
        this.setState({
          isShowAddCategory: false
        });
        // 清空表单数据
        this.addCategoryFormRef.current.resetFields();
      }
    })

  };

  updateCategoryName = () => {

    this.updateCategoryNameFormRef.current.validateFields((err, values) => {
      if (!err) {
        // 发送请求
        // console.log(values);
        const { categoryName } = values;

        const { isShowSubCategory } = this.state;

        if (!isShowSubCategory) {
          const categoryId = this.state.category._id;

          // 更新一级分类
          this.props.updateCategoryNameAsync(categoryId,categoryName);
        } else {
          const categoryId = this.state.subCategory._id;

          reqUpdateCategoryName(categoryId,categoryName)
            .then((res) => {
              message.success('更新分类名称成功~', 3);
              // 更新状态数据
              this.setState({
                subCategories: this.state.subCategories.map((category) => {
                  if (category._id === categoryId) {
                    category.name = categoryName;
                  }
                  return category;
                })
              })
            })
            .catch((error) => {
              message.error(error, 3);
            })
        }

        this.setState({
          isShowUpdateCategoryName: false
        });
        this.updateCategoryNameFormRef.current.resetFields();
      }
    })
  };

  goBack = () => {
    this.setState({
      isShowSubCategory: false
    })
  };

  render() {
    const { subCategories, category, subCategory, isShowAddCategory, isShowSubCategory, isShowUpdateCategoryName } = this.state;
    const { categories } = this.props;

    return <Card title={
      isShowSubCategory ? <Fragment><Button type="link" className="category-btn" onClick={this.goBack}>一级分类</Button><Icon type="arrow-right"/><span className="category-text">{category.name}</span></Fragment> : "一级分类列表"
    } extra={<Button type="primary" onClick={this.showAddCategory}><Icon type="plus"/>添加品类</Button>}>
      <Table
        columns={this.columns}
        dataSource={isShowSubCategory ? subCategories : categories}
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
        onCancel={this.cancel('isShowAddCategory')}
        okText="确认"
        cancelText="取消"
      >
        <AddCategoryForm categories={categories} ref={this.addCategoryFormRef}/>
      </Modal>


      <Modal
        title="修改名称"
        visible={isShowUpdateCategoryName}
        onOk={this.updateCategoryName}
        onCancel={this.cancel('isShowUpdateCategoryName')}
        okText="确认"
        cancelText="取消"
        width={300}
      >
        <UpdateCategoryNameForm category={isShowSubCategory ? subCategory : category} ref={this.updateCategoryNameFormRef}/>
      </Modal>

    </Card>;
  }
}

/***** redux ******/
export default connect(
  (state) => ({categories: state.categories}),
  { addCategoryAsync, getCategoryAsync, updateCategoryNameAsync }
)(
  Category
)