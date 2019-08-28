import React, { Component } from 'react';
import { Card, Icon, List, message } from 'antd';

import { connect } from 'react-redux';
import { getCategoryAsync } from '../../redux/action-creators';
import { reqGetCategory } from '../../api';

const Item = List.Item;

class Detail extends Component {
  state = {
    category: [''],
    subCategories: []
  };

  renderItem = (item, index) => {
    switch (index) {
      case 3:
        return <Item>商品分类: { item.length === 1 ? item[0] : <span> {item[0]} <Icon type="arrow-right"/> {item[1]} </span> }</Item>;
      case 4:
        return <Item>商品详情: <div dangerouslySetInnerHTML={{__html: item}} /></Item>
      default:
        return <Item>{item}</Item>;
    }
  };

  componentDidMount() {
    /*
      需求：需要请求到分类名称，但是目前只有分类id
      解决：
        1. 改接口，这是最完美的方案。 但是这设计到和后台沟通问题
        2. 自己多次请求实现（采用这个，如果第一种就没啥问题了）
     */
    if (!this.props.categories.length) {
      this.props.getCategoryAsync(0);
    }

    const { pCategoryId } = this.props.location.state;

    if (pCategoryId !== '0') {
      reqGetCategory(pCategoryId)
        .then((data) => {
          this.setState({
            subCategories: data
          })
        })
        .catch(() => {
          message.error('访问失败', 3)
        })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    const { categories } = nextProps;
    const { subCategories } = prevState;
    const { pCategoryId, categoryId } = nextProps.location.state;

    if (!categories.length) {
      return prevState;
    }

    if (pCategoryId === '0') {
      const name = categories.find((category) => category._id === categoryId).name;
      return {
        category: [name]
      };
    }

    if (!subCategories.length) {
      return prevState;
    }

    const pName = categories.find((category) => category._id === pCategoryId).name;
    const name = subCategories.find((category) => category._id === categoryId).name;

    return {
      category: [pName, name]
    }
  }

  render () {
    const { name, desc, price, detail } = this.props.location.state;
    const { category } = this.state;

    const data = [
      '商品名称: ' + name,
      '商品描述: ' + desc,
      '商品价格: ' + price + '元',
      category,
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

export default connect(
  (state) => ({categories: state.categories}),
  { getCategoryAsync }
)(
  Detail
)