import { combineReducers } from 'redux';
import user from './user';
import categories from './category';

export default combineReducers({
  user,
  categories
})