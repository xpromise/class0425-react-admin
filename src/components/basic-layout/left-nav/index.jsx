import React, { Component } from 'react';
import { Menu } from "antd";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import menus from '@config/menus';

import { filterMenu, createMenu } from '@utils/tools';

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
      const filterMenusList = filterMenu(menus, nextProps.menus);
      const { menusList, openKeys } = createMenu(nextProps.location.pathname, filterMenusList);

      return {
        menus: menusList,
        openKeys
      }
    }

    return prevState;
  }

  render() {
    const { pathname } = this.props.location;
    const { menus, openKeys } = this.state;

    return <Menu theme="dark" selectedKeys={[pathname]} defaultOpenKeys={openKeys} mode="inline">
      {
        menus
      }
    </Menu>;
  }
}

export default LeftNav;