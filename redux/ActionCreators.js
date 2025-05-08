import { GET_APARTMENTS } from './ActionTypes';

export const getApartments = () => {
  return {
    type: GET_APARTMENTS,
    payload: [
      { id: 1, name: 'Apartamento familiar en Burlada' },
      { id: 2, name: 'Apartamento amplio en Pamplona' },
      { id: 3, name: 'Ático en Barrio Salamanca' },
      { id: 4, name: 'Estudio moderno en el centro de Madrid' },
      { id: 5, name: 'Apartamento con vistas al mar en Málaga' },
      { id: 6, name: 'Piso acogedor en Zaragoza' },
      { id: 7, name: 'Loft industrial en Bilbao' },
      { id: 8, name: 'Apartamento luminoso en Toledo' },
      { id: 9, name: 'Apartamento de 2 habitaciones en Granada' },
      { id: 10, name: 'Apartamento confortable en Sevilla Este' },
      { id: 11, name: 'Ático con terraza en Valencia' },
      { id: 12, name: 'Piso exclusivo en Gracia, Barcelona' },
      { id: 13, name: 'Estudio elegante en Salamanca' },
      { id: 14, name: 'Apartamento familiar en el Centro de Gijón' },
      { id: 15, name: 'Piso reformado en Oviedo' },
    ],
  };
};
import { GET_APARTMENT_DESCRIPTION } from './ActionTypes';

export const getApartmentDescription = (id) => {
  const descriptions = {
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
  };

  return {
    type: GET_APARTMENT_DESCRIPTION,
    payload: descriptions[id],
  };
};