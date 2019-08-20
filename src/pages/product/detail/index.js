import React, {Component} from 'react';
import {Card, Icon, List} from 'antd';

const Item = List.Item;

export default class Detail extends Component {

  renderItem = (item, index) => {
    switch (index) {
      case 4:
        return <Item>商品详情: <div dangerouslySetInnerHTML={{__html: item}} /></Item>
      default:
        return <Item>{item}</Item>;
    }
  };

  render () {
    const { name, desc, price, pCategoryId, detail } = this.props.location.state.product;

    let category;
    const {pName} = this.props.location.state;
    if (pCategoryId === '0') {
      category = <span>商品分类: {name}</span>;
    } else {
      category = <span>商品分类: {pName}<Icon type='arrow-right'/>{name}</span>;
    }

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
