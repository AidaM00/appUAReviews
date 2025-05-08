import { GET_APARTMENTS } from './ActionTypes';

const initialState = {
  apartments: [],
};

export default function apartmentState(state = initialState, action) {
  switch (action.type) {
    case GET_APARTMENTS:
      return {
        ...state,
        apartments: action.payload,
      };
    default:
      return state;
  }
}
