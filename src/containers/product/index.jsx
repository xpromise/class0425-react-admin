import React, { Component, Fragment } from 'react';
import { Card, Select, Input, Button, Icon, Table, message } from 'antd';

import { reqGetProduct, reqUpdateProductStatus } from '@api';
import './index.less';

const { Option } = Select;

export default class Product extends Component {
  state = {
    products: [],
    total: 0,
    pageSize: 3,
    pageNum: 1,
    searchKey: 'productName',
    searchValue: ''
  };

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (text) => `￥${text}`
    },
    {
      title: '状态', // 列的标题
      render: (product) => {
        const { status, _id } = product;
        return <Fragment>
          <Button type="primary" onClick={this.updateProductStatus(_id, status)}>{status === 1 ? '上架' : '下架'}</Button>
          &nbsp;&nbsp;&nbsp;{status === 1 ? '已下架' : '已上架'}
        </Fragment>
      }
    },
    {
      title: '操作', // 列的标题
      render: (product) => {
        return <Fragment>
          <Button type="link" onClick={this.goProductDetail(product)}>详情</Button>
          <Button type="link" onClick={this.goUpdateProduct(product)}>修改</Button>
        </Fragment>
      }
    }
  ];

  updateProductStatus = (productId, status) => {
    return () => {
      const newStatus = 3 - status;
      reqUpdateProductStatus(productId, newStatus)
        .then(() => {
          this.setState({
            products: this.state.products.map((product) => {
              if (product._id === productId) {
                product.status = newStatus;
              }
              return product;
            })
          })
        })
        .catch((err) => {
          message.error(err);
        })
    }
  };

  goProductDetail = (product) => {
    return () => {
      this.props.history.push('/product/detail', product);
    }
  };

  goUpdateProduct = (product) => {
    return () => {
      this.props.history.push('/product/saveupdate', product);
    }
  };

  searchChange = (key) => {
    return (value) => {
      this.setState({
        [key]: value
      })
    }
  };

  goSaveUpdate = () => {
    this.props.history.push('/product/saveupdate');
  };

  getProduct = (pageNum, pageSize) => {
    reqGetProduct(pageNum, pageSize)
      .then((res) => {
        this.setState({
          products: res.list,
          total: res.total,
          pageSize,
          pageNum,
        })
      })
      .catch((err) => {
        message.error(err);
      })
  };

  componentDidMount() {
    this.getProduct(1, 3);
  };

  render() {
    const { products, total, pageSize, pageNum } = this.state;

    return <Card title={
      <Fragment>
        <Select defaultValue="productName" onChange={this.searchChange('searchKey')}>
          <Option key="1" value="productName">根据商品名称</Option>
          <Option key="2" value="productDesc">根据商品描述</Option>
        </Select>
        <Input placeholder="关键字" className="product-input" onChange={this.searchChange('searchValue')}/>
        <Button type="primary" onClick={this.search}>搜索</Button>
      </Fragment>
    } extra={<Button type="primary" onClick={this.goSaveUpdate}><Icon type="plus"/>添加商品</Button>}>
      <Table
        columns={this.columns}
        dataSource={products}
        bordered
        pagination={{
          showQuickJumper: true, // 显示快速跳转
          showSizeChanger: true, // 显示修改每页显示数量
          pageSizeOptions: ['3', '6', '9', '12'], // 修改每页显示数量
          defaultPageSize: 3, // 默认显示数量
          total, // 总数
          onChange: this.getProduct, // 页码发生变化的事件
          onShowSizeChange: this.getProduct, // pageSize 变化的回调
          pageSize,
          current: pageNum
        }}
        rowKey="_id"
      />
    </Card>;
  }
}