import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "antd";

import { connect } from 'react-redux';

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
    // 筛选menuList
    const roleMenus = this.props.user.role.menus;
    const menus = this.filterMenu(menuList, roleMenus);
    // console.log(menus);
    this.menus = this.createMenu(pathname, menus);

    this.state = {
      selectedKey: ''
    };
  }

  // 对每一个组件进行验证是否有不必要的render
  // 如果有，定义shouldComponentUpdate来优化
  // 优化，当前组件不用重新render
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    for (const key in nextState) {
      if (nextState[key] !== this.state[key]) {
        // 之前状态和最新状态不一样，需要更新
        return true;
      }
    }
    return false;
  }

  filterMenu = (menuList, roleMenus) => {
    return menuList.reduce((prev, curr) => {
      if (roleMenus.includes(curr.key)) {
        prev.push(curr);
      } else {
        // 一级菜单没有配置上，看是否有二级菜单
        if (curr.children) {
          const cMenus = curr.children.filter((cMenu) => roleMenus.includes(cMenu.key));
          if (cMenus.length) {
            // 可能子菜单有三个，但是添加1个
            curr.children = cMenus;
            prev.push(curr);
          }
        }
      }
      return prev;
    }, []);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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

  createMenu = (path, menuList) => {
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

/******* redux ******/
export default connect(
  (state) => ({user: state.user}),
  null
)(withRouter(LeftNav));