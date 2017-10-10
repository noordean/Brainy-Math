import { combineReducers } from 'redux';
import startReducer from './startReducer';

export default combineReducers({
  operands: startReducer
});
