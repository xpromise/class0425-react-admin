import React, { Component } from 'react';
import { Card, Icon, List } from 'antd';

import { connect } from 'react-redux';
import { getCategoryAsync } from '@actions/category';

const Item = List.Item;

@connect(
  (state) => ({categories: state.categories}),
  { getCategoryAsync }
)
class ProductDetail extends Component {

  renderItem = (item, index) => {
    switch (index) {
      case 4:
        return <Item>商品详情: <div dangerouslySetInnerHTML={{__html: item}} /></Item>;
      default:
        return <Item>{item}</Item>;
    }
  };

  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoryAsync();
    }
  }

  render () {
    const { name, desc, categoryId, price, detail } = this.props.location.state;
    const { categories } = this.props;

    let categoryName = '';
    if (categories.length) {
      categoryName = categories.find((category) => {
        return category._id === categoryId
      }).name;
    }

    const data = [
      '商品名称: ' + name,
      '商品描述: ' + desc,
      '商品价格: ' + price + '元',
      <span>商品分类: { categoryName }</span>,
      detail
    ];

    return (
      <Card
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon onClick={() => this.props.history.goBack()} type='arrow-left' style={{fontSize: 25, marginRight: 10}}/>
            <span>商品详情</span>
          </div>
        }
      >
        <List
          bordered
          size="large"
          dataSource={data}
          renderItem={this.renderItem}
        />
      </Card>
    )
  }
}
export default ProductDetail;