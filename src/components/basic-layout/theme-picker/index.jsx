import React, { Component, Fragment } from 'react';
import { Icon, Drawer, Button, Divider } from 'antd';
import { SketchPicker } from 'react-color';
import { withTranslation } from 'react-i18next';

import { setThemeStyle } from '@utils/theme';

import './index.less';

@withTranslation()
class ThemePicker extends Component {
  state = {
    visible: false,
    color: '#1DA57A',
    prevColor: '#1DA57A'
  };

  showDrawer = () => {
    this.setState({
      visible: true
    })
  };

  onClose = () => {
    this.setState({
      visible: false,
      color: this.state.prevColor
    })
  };

  changeComplete = (color) => {
    this.setState({
      color: color.hex
    })
  };

  submit = () => {
    // 更换主题色
    const { color } = this.state;

    setThemeStyle(color);

    this.setState({
      prevColor: color,
      visible: false,
    })
  };

  render() {
    const { color, visible } = this.state;
    const { t } = this.props;

    return <Fragment>
      <Button type="primary" className="theme-setting-btn" onClick={this.showDrawer}>
        <Icon type="setting" className="theme-setting-icon"/>
      </Button>
      <Drawer
        title={t('theme.title')}
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={visible}
      >
        <SketchPicker
          color={color}
          onChangeComplete={this.changeComplete}
        />
        <Divider />
        <Button onClick={this.onClose}>{t('theme.cancelText')}</Button>
        <Button onClick={this.submit}>{t('theme.okText')}</Button>
      </Drawer>
    </Fragment>;
  }
}

export default ThemePicker;