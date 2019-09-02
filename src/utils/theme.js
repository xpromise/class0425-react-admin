import { setItem, getItem } from './storage';

function getThemeStyle(color) {

  return `
    /* 菜单 */
    .ant-menu.ant-menu-dark .ant-menu-item-selected {
      background-color: ${color};
    }
    /* 按钮 */
    .ant-btn-link {
      color: ${color};
    }
    .ant-btn:hover, .ant-btn:focus{
      color: ${color};
      border-color: ${color};
    }
    .ant-btn-primary, .ant-btn-primary:hover, .ant-btn-primary:focus{
      border-color: ${color};
      background-color: ${color};
    }
    /* 头部底边框 */
    .header-main .header-main-top {
      border-bottom: 1px solid ${color};
    }
  `;
}

let styleElement = null;

function setThemeStyle(color) {
  const themeStyle = getThemeStyle(color);

  const headElement = document.querySelector('head');

  if (!styleElement) {
    styleElement = document.createElement('style');

    headElement.appendChild(styleElement);
  }

  styleElement.innerHTML = themeStyle;

  // 持久化存储
  setItem('theme', color);

}

function initThemeStyle() {
  let color = getItem('theme');
  if (!color) return;
  setThemeStyle(color);
}

export {
  setThemeStyle,
  initThemeStyle
};