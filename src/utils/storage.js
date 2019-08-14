/*
  封装了localStorage的函数模块
 */
const USER_KEY = 'user';

function getItem() {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

function setItem(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function removeItem() {
  localStorage.removeItem(USER_KEY);
}

export {
  getItem,
  setItem,
  removeItem
}