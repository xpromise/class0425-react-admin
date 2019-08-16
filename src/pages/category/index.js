import React, { Component, Fragment } from 'react';
import { Card, Button, Icon, Table } from 'antd';

import './index.less';

export default class Category extends Component {
  render() {
    // 列的数据
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'categoryName',
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
    // 每一行的具体数据
    const data = [
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
    ];

    return <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus"/>添加品类</Button>}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{
          showQuickJumper: true, // 显示快速跳转
          showSizeChanger: true, // 显示修改每页显示数量
          pageSizeOptions: ['3', '6', '9', '12'], // 修改每页显示数量
          defaultPageSize: 3 // 默认显示数量
        }}
        rowKey="_id"
      />,
    </Card>;
  }
}