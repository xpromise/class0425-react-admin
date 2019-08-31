/*
  封装了localStorage的函数模块
 */
const TOKEN_KEY = 'token';

function getItem() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}

function setItem(user) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
}

function removeItem() {
  localStorage.removeItem(TOKEN_KEY);
}

export {
  getItem,
  setItem,
  removeItem
}