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
