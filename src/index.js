import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
// 导入i18n
import './i18n';
import './assets/css/reset.css';

ReactDOM.render(
  <Suspense fallback={<Spin size="large"/>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>, document.getElementById('root'));