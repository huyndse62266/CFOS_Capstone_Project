import { combineReducers } from 'redux';
import system from './system/systemReducer';
import product from './Product/productReducer';

export default combineReducers({
  system,
  product
});
