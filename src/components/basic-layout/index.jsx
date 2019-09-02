import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import { withTranslation } from 'react-i18next';

import HeaderMain from './header-main';
import FooterMain from './footer-main';
import LeftNav from './left-nav';
import ThemePicker from './theme-picker';

import logo from '../../assets/images/logo.png';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;

@withTranslation()
class BaseLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: 'block',
    menus: []
  };

  // 展开菜单项
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      isDisplay: collapsed ? 'none' : 'block'
    })
  };

  render() {
    const { isDisplay, collapsed } = this.state;
    const { t } = this.props;

    return <Layout style={{ minHeight: '100vh', minWidth: 900 }}>
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <Link to="/" className="admin-logo">
          <img src={logo} alt="logo"/>
          <h1 style={{display: isDisplay}}>{t('admin.title')}</h1>
        </Link>
        <LeftNav />
      </Sider>
      <Layout>
        <ThemePicker />
        <Header style={{ background: '#fff', padding: 0 }}>
          <HeaderMain />
        </Header>
        <Content style={{ margin: '70px 16px 0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            { this.props.children }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <FooterMain />
        </Footer>
      </Layout>
    </Layout>;
  }
}

export default BaseLayout;