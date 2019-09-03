
import {
  ADD_CATEGORY_SUCCESS,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_NAME_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from '../action-types/category';

function categories(prevState = [], action) {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS :
      return action.data;
    case UPDATE_CATEGORY_NAME_SUCCESS :
      return prevState.map((category) => {
        if (category._id === action.data._id) {
          return action.data;
        }
        return category;
      });
    case DELETE_CATEGORY_SUCCESS :
      return prevState.filter((category) => category._id !== action.data);
    case ADD_CATEGORY_SUCCESS :
      return [...prevState, action.data];
    default :
      return prevState;
  }
}

export default categories;