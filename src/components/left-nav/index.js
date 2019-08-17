import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "antd";

import { menuList } from '../../config';

const { SubMenu } = Menu;
const { Item } = Menu;

class LeftNav extends Component {
  constructor(props) {
    super(props); // 必须声明prop，否则this.props就是undefined

    let { pathname } = this.props.location;
    if (pathname.startsWith('/product')) {
      pathname = '/product'
    }
    this.menus = this.createMenu(pathname);

    this.state = {
      selectedKey: ''
    }
  }

  static getDerivedStateFromProps(nextProps) {
    let { pathname } = nextProps.location;
    // startsWith 以什么开头
    if (pathname.startsWith('/product')) {
      pathname = '/product'
    }
    return {
      selectedKey: pathname
    }
  }

  createItem = (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
      </Link>
    </Item>
  };

  createMenu = (path) => {
    return menuList.map((menu) => {
      if (menu.children) {
        // 二级菜单
        return <SubMenu key={menu.key} title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}>
          {
            menu.children.map((item) => {
              if (path === item.key) {
                // 当前地址是二级菜单，展开一级菜单
                this.openKey = menu.key;
              }
              return this.createItem(item);
            })
          }
        </SubMenu>
      } else {
        // 一级菜单
        return this.createItem(menu);
      }
    })
  };

  render() {
    return <Menu theme="dark" selectedKeys={[this.state.selectedKey]} defaultOpenKeys={[this.openKey]} mode="inline">
      {
        this.menus
      }
    </Menu>;
  }
}

// withRouter是一个高阶组件：负责给LeftNav传递路由组件的三大属性
export default withRouter(LeftNav);