import { combineReducers } from 'redux';
import apartmentState from './apartments';
import descripcion from './descripcion';

export default combineReducers({
  apartmentState,
  descripcion,
});
