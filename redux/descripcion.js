import { GET_APARTMENT_DESCRIPTION } from './ActionTypes';

const initialState = {
  descriptions: {
    1: { address: 'Calle Mayor, 23, Burlada' },
    2: { address: 'Avenida de Zaragoza, 55, Pamplona' },
    3: { address: 'Calle de Velázquez, 120, Madrid' },
    4: { address: 'Calle Gran Vía, 14, Madrid' },
    5: { address: 'Paseo Marítimo Pablo Ruiz Picasso, 37, Málaga' },
    6: { address: 'Calle Alfonso I, 10, Zaragoza' },
    7: { address: 'Calle Henao, 5, Bilbao' },
    8: { address: 'Calle Comercio, 18, Toledo' },
    9: { address: 'Calle Reyes Católicos, 33, Granada' },
    10: { address: 'Calle Emilio Lemos, 12, Sevilla' },
    11: { address: 'Avenida del Puerto, 280, Valencia' },
    12: { address: 'Carrer de Verdi, 45, Barcelona' },
    13: { address: 'Calle Toro, 9, Salamanca' },
    14: { address: 'Calle Corrida, 22, Gijón' },
    15: { address: 'Calle Uría, 50, Oviedo' },
  },
};

const descripcionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APARTMENT_DESCRIPTION:
      return {
        ...state,
        selected: state.descriptions[action.payload],
      };
    default:
      return state;
  }
};

export default descripcionReducer;
