import { SET_APARTMENT_RATING } from './ActionTypes';

const initialState = {
  ratingsByApartment: {}
};

export default function ratingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_APARTMENT_RATING: {
      const { apartmentId, ratingData } = action.payload;
      return {
        ...state,
        ratingsByApartment: {
          ...state.ratingsByApartment,
          [apartmentId]: [
            ...(state.ratingsByApartment[apartmentId] || []),
            ratingData
          ]
        }
      };
    }

    default:
      return state;
  }
}
