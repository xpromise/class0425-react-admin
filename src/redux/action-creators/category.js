import { message } from 'antd';
import {
  reqAddCategory,
  reqGetCategory,
  reqUpdateCategoryName,
  reqDeleteCategory
} from '@api';
import {
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_NAME_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from '../action-types/category';

const addCategorySuccess = (category) => ({type: ADD_CATEGORY_SUCCESS, data: category});
const getCategorySuccess = (categories) => ({type: GET_CATEGORY_SUCCESS, data: categories});
const updateCategoryNameSuccess = (category) => ({type: UPDATE_CATEGORY_NAME_SUCCESS, data: category});
const deleteCategorySuccess = (categoryId) => ({type: DELETE_CATEGORY_SUCCESS, data: categoryId});

export const addCategoryAsync = (categoryName) => {
  return (dispatch) => {
    reqAddCategory(categoryName)
      .then((res) => {
        dispatch(addCategorySuccess(res));
      })
      .catch((err) => {
        message.error(err);
      })
  }
};

export const getCategoryAsync = () => {
  return (dispatch) => {
    reqGetCategory()
      .then((res) => {
        dispatch(getCategorySuccess(res));
      })
      .catch((err) => {
        message.error(err);
      })
  }
};

export const updateCategoryNameAsync = (categoryId, categoryName) => {
  return (dispatch) => {
    reqUpdateCategoryName(categoryId, categoryName)
      .then((res) => {
        dispatch(updateCategoryNameSuccess(res));
      })
      .catch((err) => {
        message.error(err);
      })
  }
};


export const deleteCategoryAsync = (categoryId) => {
  return (dispatch) => {
    reqDeleteCategory(categoryId)
      .then((res) => {
        dispatch(deleteCategorySuccess(res));
      })
      .catch((err) => {
        message.error(err);
      })
  }
};