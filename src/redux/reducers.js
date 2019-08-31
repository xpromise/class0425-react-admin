
import { combineReducers } from 'redux';
import {
  SAVE_TOKEN,
  REMOVE_TOKEN,
  SAVE_USER,
  REMOVE_USER,
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_NAME_SUCCESS,
  GET_ROLE_SUCCESS,
  ADD_ROLE_SUCCESS,
  UPDATE_ROLE_SUCCESS
} from './action-types';

function token(prevState = '', action) {
  switch (action.type) {
    case SAVE_TOKEN :
      return action.data;
    case REMOVE_TOKEN :
      return '';
    default :
      return prevState;
  }
}

function user(prevState = {}, action) {
  switch (action.type) {
    case SAVE_USER :
      return action.data;
    case REMOVE_USER :
      return {};
    default :
      return prevState;
  }
}

function categories(prevState = [], action) {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS :
      return action.data;
    case ADD_CATEGORY_SUCCESS :
      return [...prevState, action.data];
    case UPDATE_CATEGORY_NAME_SUCCESS :
      return prevState.map((category) => {
        if (category._id === action.data.categoryId) {
          category.name = action.data.categoryName;
        }
        return category;
      });
    default :
      return prevState;
  }
}

function roles(prevState = [], action) {
  switch (action.type) {
    case GET_ROLE_SUCCESS :
      return action.data;
    case ADD_ROLE_SUCCESS :
      return [...prevState, action.data];
    case UPDATE_ROLE_SUCCESS :
      return prevState.map((role) => {
        if (role._id === action.data._id) {
          return action.data;
        }
        return role;
      });
    default :
      return prevState;
  }
}

export default combineReducers({
  token,
  user,
  categories,
  roles
})