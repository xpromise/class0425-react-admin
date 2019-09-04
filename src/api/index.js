import axiosInstance from './request';

// 定义请求登录方法
export const reqLogin = (username, password) => axiosInstance.post('/login', {username, password});

// 定义请求添加分类方法
export const reqAddCategory = (categoryName) => axiosInstance.post('/category/add', {categoryName});

export const reqGetCategory = () => axiosInstance.get('/category/get');

export const reqUpdateCategoryName = (categoryId, categoryName) => axiosInstance.post('/category/update', {categoryId, categoryName});

export const reqDeleteCategory = (categoryId) => axiosInstance.post('/category/delete', {categoryId});

export const reqGetProduct = (pageNum, pageSize) => axiosInstance.get('/product/list', {params: {pageNum, pageSize}});

export const reqAddProduct = ({categoryId, name, price, desc, detail}) => axiosInstance.post('/product/add', {categoryId, name, price, desc, detail});

export const reqUpdateProduct = ({productId, categoryId, name, price, desc, detail}) => axiosInstance.post('/product/update', {productId, categoryId, name, price, desc, detail});

export const reqUpdateProductStatus = (productId, status) => axiosInstance.post('/product/update/status', {productId, status});

export const reqGetUser = () => axiosInstance.get('/user/get');

export const reqDeleteUser = (username) => axiosInstance.post('/user/delete', {username});

export const reqAddUser = ({username, password, phone, email, roleId}) => axiosInstance.post('/user/add', {username, password, phone, email, roleId});

export const reqUpdateUser = (username, password) => axiosInstance.post('/user/update', {username, password});

export const reqGetRole = () => axiosInstance.get('/role/get');

export const reqAddRole = (name) => axiosInstance.post('/role/add', {name});

export const reqUpdateRole = (roleId, authName, menus) => axiosInstance.post('/role/update', {roleId, authName, menus});









