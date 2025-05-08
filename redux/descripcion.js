import { GET_APARTMENT_DESCRIPTION } from './ActionTypes';

const initialState = {
  descriptions: {
    
  },
};

const descripcionReducer = (state = { descriptions: {} }, action) => {
  switch (action.type) {
    case GET_APARTMENT_DESCRIPTION:
      return {
        ...state,
        descriptions: {
          ...state.descriptions,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default descripcionReducer;
