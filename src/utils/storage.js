/*
  封装了localStorage的函数模块
 */

function getItem(key) {
  const result = JSON.parse(localStorage.getItem(key));
  return key === 'user' ? result || {} : result;
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  localStorage.removeItem(key);
}

export {
  getItem,
  setItem,
  removeItem
}