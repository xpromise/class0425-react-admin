import axiosInstance from './request';

// 定义请求登录方法
export const reqLogin = (username, password) => axiosInstance.post('/login', {username, password});

// 定义请求添加分类方法
export const reqAddCategory = (categoryName) => axiosInstance.post('/category/add', {categoryName});

export const reqGetCategory = () => axiosInstance.get('/category/get');

export const reqUpdateCategoryName = (categoryId, categoryName) => axiosInstance.post('/category/update', {categoryId, categoryName});

export const reqDeleteCategory = (categoryId) => axiosInstance.post('/category/delete', {categoryId});

