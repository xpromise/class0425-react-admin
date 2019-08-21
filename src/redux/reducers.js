
import { combineReducers } from 'redux';
import { SAVE_USER, REMOVE_USER } from './action-types';

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

export default combineReducers({
  user
})