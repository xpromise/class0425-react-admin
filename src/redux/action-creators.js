/*
  包含n个创建action对象的工厂函数模块
 */
import { SAVE_USER, REMOVE_USER } from './action-types';

// 保存用户数据action
export const saveUser = (user) => ({type: SAVE_USER, data: user});
// 删除用户数据action
export const removeUser = () => ({type: REMOVE_USER});