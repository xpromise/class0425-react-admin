import React, { Component } from 'react';
import { Menu } from "antd";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import menus from '@config/menus';

import { filterMenu, createMenu, checkProductRoute } from '@utils/tools';

@connect(
  (state) => ({menus: state.user.data.menus})
)
@withRouter
class LeftNav extends Component {

  state = {
    menus: [],
    openKeys: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.menus.length) {
      // 根据用户权限menus列表 和 config/menus 来生成用户权限菜单。
      let { pathname } = nextProps.location;
      pathname = checkProductRoute(pathname);

      const filterMenusList = filterMenu(menus, nextProps.menus);
      const { menusList, openKeys } = createMenu(pathname, filterMenusList);

      return {
        menus: menusList,
        openKeys
      }
    }

    return prevState;
  }

  render() {
    const { menus, openKeys } = this.state;
    let { pathname } = this.props.location;
    pathname = checkProductRoute(pathname);

    return <Menu theme="dark" selectedKeys={[pathname]} defaultOpenKeys={openKeys} mode="inline">
      {
        menus
      }
    </Menu>;
  }
}

export default LeftNav;