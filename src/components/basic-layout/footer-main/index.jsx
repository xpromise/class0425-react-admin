import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

@withTranslation()
class FooterMain extends Component {
  render() {
    return <div>
      { this.props.t('admin.footer') }
    </div>;
  }
}

export default FooterMain;