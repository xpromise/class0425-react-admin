/*
  包含n个创建action对象的工厂函数模块
 */
import { message } from 'antd';
import {
  SAVE_USER,
  REMOVE_USER,
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_NAME_SUCCESS,
  GET_ROLE_SUCCESS,
  ADD_ROLE_SUCCESS,
  UPDATE_ROLE_SUCCESS
} from './action-types';
import {
  reqGetCategory,
  reqAddCategory,
  reqUpdateCategoryName,
  reqGetRole,
  reqAddRole,
  reqUpdateRole
} from '../api';
// 保存用户数据action
export const saveUser = (user) => ({type: SAVE_USER, data: user});
// 删除用户数据action
export const removeUser = () => ({type: REMOVE_USER});

// 获取分类数据同步action
export const getCategorySuccess = (categories) => ({type: GET_CATEGORY_SUCCESS, data: categories});
// 添加分类数据同步action
export const addCategorySuccess = (category) => ({type: ADD_CATEGORY_SUCCESS, data: category});
// 更新分类数据同步action
export const updateCategoryNameSuccess = (category) => ({type: UPDATE_CATEGORY_NAME_SUCCESS, data: category});

// 获取角色数据同步action
export const getRoleSuccess = (roles) => ({type: GET_ROLE_SUCCESS, data: roles});
// 添加角色数据同步action
export const addRoleSuccess = (role) => ({type: ADD_ROLE_SUCCESS, data: role});
// 更新角色数据同步action
export const updateRoleSuccess = (role) => ({type: UPDATE_ROLE_SUCCESS, data: role});

// 获取分类数据异步action
export const getCategoryAsync = (parentId) => {
  return (dispatch) => {
    // 发送请求，请求添加分类数据
    reqGetCategory(parentId)
      .then((res) => {
        // 提示请求成功
        message.success('获取分类成功', 3);
        // 更新redux中的状态数据
        dispatch(getCategorySuccess(res));
      })
      .catch(() => {
        // 提示请求失败
        message.error('获取分类失败', 3);
      })
  }
};
// 添加分类数据异步action
export const addCategoryAsync = (parentId, categoryName) => {
  return (dispatch) => {
    // 发送请求，请求添加分类数据
    reqAddCategory(parentId, categoryName)
      .then((res) => {
        // 提示请求成功
        message.success('添加分类成功', 3);
        // 更新redux中的状态数据
        dispatch(addCategorySuccess(res));
      })
      .catch(() => {
        // 提示请求失败
        message.error('添加分类失败', 3);
      })
  }
};
// 更新分类名称action
export const updateCategoryNameAsync = (categoryId, categoryName) => {
  return (dispatch) => {
    // 发送请求，请求添加分类数据
    reqUpdateCategoryName(categoryId, categoryName)
      .then((res) => {
        // 提示请求成功
        message.success('更新分类成功', 3);
        // 更新redux中的状态数据
        dispatch(updateCategoryNameSuccess({categoryId, categoryName}));
      })
      .catch(() => {
        // 提示请求失败
        message.error('更新分类失败', 3);
      })
  }
};

// 获取角色数据异步action
export const getRoleAsync = () => {
  return (dispatch) => {
    reqGetRole()
      .then((res) => {
        // 提示请求成功
        message.success('获取角色数据成功', 3);
        // 更新redux中的状态数据
        dispatch(getRoleSuccess(res));
      })
      .catch(() => {
        // 提示请求失败
        message.error('获取角色数据失败', 3);
      })
  }
};
// 添加角色数据异步action
export const addRoleAsync = (name) => {
  return (dispatch) => {
    reqAddRole(name)
      .then((res) => {
        // 提示请求成功
        message.success('添加角色数据成功', 3);
        // 更新redux中的状态数据
        dispatch(addRoleSuccess(res));
      })
      .catch(() => {
        // 提示请求失败
        message.error('添加角色数据失败', 3);
      })
  }
};
// 设置角色权限异步action
export const updateRoleAsync = (_id, auth_name, menus) => {
  return (dispatch) => {
    reqUpdateRole(_id, auth_name, menus)
      .then((res) => {
        // 提示请求成功
        message.success('更新角色数据成功', 3);
        // 更新redux中的状态数据
        dispatch(updateRoleSuccess(res));
      })
      .catch(() => {
        // 提示请求失败
        message.error('更新角色数据失败', 3);
      })
  }
};