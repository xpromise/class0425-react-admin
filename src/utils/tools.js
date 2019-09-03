import React from "react";
import { Icon, Menu } from "antd";
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

const { SubMenu, Item } = Menu;

const filterMenu = (menuList, roleMenus) => {
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

const createItem = (menu) => {
  return <Item key={menu.key}>
    <Link to={menu.key}>
      <Icon type={menu.icon} />
      <span><Trans i18nKey={menu.title}/></span>
    </Link>
  </Item>
};

const createMenu = (path, menuList) => {
  let openKeys = [];
  const menusList = menuList.map((menu) => {
    if (menu.children) {
      // 二级菜单
      return <SubMenu key={menu.key} title={<span><Icon type={menu.icon} /><span><Trans i18nKey={menu.title}/></span></span>}>
        {
          menu.children.map((item) => {
            if (path === item.key) {
              // 当前地址是二级菜单，展开一级菜单
              openKeys.push(menu.key);
            }
            return createItem(item);
          })
        }
      </SubMenu>
    } else {
      // 一级菜单
      return createItem(menu);
    }
  });

  return {
    openKeys,
    menusList
  }
}

const checkProductRoute = (pathname) => {
  if (pathname.startsWith('/product')) {
    return '/product';
  }
  return pathname;
};

export {
  filterMenu,
  createMenu,
  checkProductRoute
}