const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');
const { resolve } = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  // 添加装饰器语法，简化高阶组件使用
  addDecoratorsLegacy(),
  // 添加webpack alias语法： 优点：可以简化路径  缺点：没有路径提示
  addWebpackAlias({
    '@utils': resolve(__dirname, 'src/utils'),
    '@config': resolve(__dirname, 'src/config'),
    '@actions': resolve(__dirname, 'src/redux/action-creators'),
    '@api': resolve(__dirname, 'src/api'),
    '@components': resolve(__dirname, 'src/components'),
    '@containers': resolve(__dirname, 'src/containers'),
  })
);