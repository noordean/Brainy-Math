import { combineReducers } from 'redux';
import generateOperands from './generateOperands';
import generateOptions from './generateOptions';

export default combineReducers({
  operands: generateOperands,
  options: generateOptions
});
