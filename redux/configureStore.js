import { createStore, combineReducers, } from 'redux';
import { GET_APARTMENTS } from './ActionTypes';

const initialApartmentState = {
  apartments: [],
};

const apartmentReducer = (state = initialApartmentState, action) => {
  switch (action.type) {
    case GET_APARTMENTS:
      return { ...state, apartments: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  apartmentState: apartmentReducer,
  descripcion: descripcionReducer, 
});

export const store = createStore(rootReducer);
