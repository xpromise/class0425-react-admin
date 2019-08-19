import React, { Component, Fragment } from 'react';
import { Card, Select, Input, Button, Icon, Table, message } from 'antd';

import { reqGetProduct, reqSearchProduct } from '../../../api';

import './index.less';

const { Option } = Select;

export default class Index extends Component {
  state = {
    products: [],
    total: 0,
    pageSize: 3,
    pageNum: 1,
    searchKey: 'productName',
    searchValue: '',
    isSearch: false
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
        return <Fragment>
          <Button type="primary">上架</Button>
          &nbsp;&nbsp;&nbsp;已下架
        </Fragment>
      }
    },
    {
      title: '操作', // 列的标题
      render: (product) => {
        return <Fragment>
          <Button type="link">详情</Button>
          <Button type="link" onClick={this.goUpdateProduct(product)}>修改</Button>
        </Fragment>
      }
    }
  ];

  goUpdateProduct = (product) => {
    return () => {
      // product可以再location.state中获取
      this.props.history.push('/product/saveupdate', product);
    }
  };

  componentDidMount() {
    this.getProduct(1, 3);
  }

  getProduct = (pageNum, pageSize) => {
    const { searchValue, isSearch } = this.state;
    if (isSearch && searchValue) {
      this.setState({
        pageNum,
        pageSize
      }, () => {
        // 函数会在更新状态之后触发
        this.search();
      });
    } else {
      reqGetProduct(pageNum, pageSize)
        .then((res) => {
          message.success('获取产品列表成功', 3);
          this.setState({
            products: res.list,
            total: res.total,
            pageSize,
            pageNum
          })
        })
        .catch((err) => {
          message.error(err, 3);
        })
    }
  };

  goSaveUpdate = () => {
    this.props.history.push('/product/saveupdate');
  };

  handleChange = (key) => {
    return (e) => {
      this.setState({
        [key]: typeof e === 'string' ? e : e.target.value
      })
    }
  };

  // 保存上一份搜索的内容
  searchValue = '';

  search = (e) => {
    let { searchKey, searchValue, pageSize, pageNum } = this.state;
    /*if (!searchValue) {
      message.error('搜索内容不能为空', 3);
      return;
    }*/
    // 检测是否是点击搜索按钮去搜索
    pageNum = typeof e === 'object' ? 1 : pageNum;

    // 保存一份searchValue
    if (typeof e === 'object') {
      this.searchValue = searchValue;
    }

    reqSearchProduct({
      [searchKey]: this.searchValue,
      pageNum,
      pageSize
    })
      .then((res) => {
        message.success('搜索产品成功~', 3);
        this.setState({
          products: res.list,
          total: res.total,
          pageSize,
          pageNum,
          isSearch: true
        })
      })
      .catch(() => {
        message.error('搜索失败', 3);
      })

  };

  render() {
    const { products, total, pageSize, pageNum } = this.state;

    return <Card title={
      <Fragment>
        <Select defaultValue="productName" onChange={this.handleChange('searchKey')}>
          <Option key="1" value="productName">根据商品名称</Option>
          <Option key="2" value="productDesc">根据商品描述</Option>
        </Select>
        <Input placeholder="关键字" className="product-input" onChange={this.handleChange('searchValue')}/>
        <Button type="primary" onClick={this.search}>搜索</Button>
      </Fragment>
    } extra={<Button type="primary" onClick={this.goSaveUpdate}><Icon type="plus"/>添加产品</Button>}>
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