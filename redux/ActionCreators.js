import { GET_APARTMENTS, GET_APARTMENT_DESCRIPTION, SET_APARTMENT_RATING } from './ActionTypes';

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

export const getApartmentDescription = (id) => {
  const descriptions = {
    1: {
      address: 'Calle Mayor, 23, Burlada',
      coords: { latitude: 42.8252, longitude: -1.6081 },
      features: [
        { key: 'dormitorios', label: '3 dormitorios', icon: 'bed-outline' },
        { key: 'baños', label: '2 baños', icon: 'shower' },
        { key: 'terraza', label: 'Con terraza', icon: 'balcony' },
      ],
    },
    2: {
      address: 'Avenida de Zaragoza, 55, Pamplona',
      coords: { latitude: 42.8125, longitude: -1.6468 },
      features: [
        { key: 'dormitorios', label: '2 dormitorios', icon: 'bed-outline' },
        { key: 'salon', label: 'Salón espacioso', icon: 'sofa' },
        { key: 'parking', label: 'Incluye parking', icon: 'car-outline' },
      ],
    },
    3: {
      address: 'Calle de Velázquez, 120, Madrid',
      coords: { latitude: 40.4352, longitude: -3.6821 },
      features: [
        { key: 'dormitorios', label: '1 dormitorio', icon: 'bed-outline' },
        { key: 'baños', label: '1 baño moderno', icon: 'shower' },
        { key: 'terraza', label: 'Ático con terraza', icon: 'balcony' },
      ],
    },
    4: {
      address: 'Calle Gran Vía, 14, Madrid',
      coords: { latitude: 40.4205, longitude: -3.7039 },
      features: [
        { key: 'salon', label: 'Salón amplio', icon: 'sofa' },
        { key: 'oficina', label: 'Espacio tipo oficina', icon: 'desk' },
      ],
    },
    5: {
      address: 'Paseo Marítimo Pablo Ruiz Picasso, 37, Málaga',
      coords: { latitude: 36.7196, longitude: -4.4015 },
      features: [
        { key: 'dormitorios', label: '2 dormitorios', icon: 'bed-outline' },
        { key: 'vista', label: 'Vistas al mar', icon: 'binoculars' },
        { key: 'terraza', label: 'Amplia terraza frente al mar', icon: 'balcony' },
      ],
    },
    6: {
      address: 'Calle Alfonso I, 10, Zaragoza',
      coords: { latitude: 41.6558, longitude: -0.8782 },
      features: [
        { key: 'baños', label: '1 baño', icon: 'shower' },
        { key: 'dormitorios', label: '2 dormitorios', icon: 'bed-outline' },
      ],
    },
    7: {
      address: 'Calle Henao, 5, Bilbao',
      coords: { latitude: 43.2630, longitude: -2.9350 },
      features: [
        { key: 'loft', label: 'Estilo industrial', icon: 'factory' },
        { key: 'salon', label: 'Salón integrado con cocina', icon: 'sofa' },
      ],
    },
    8: {
      address: 'Calle Comercio, 18, Toledo',
      coords: { latitude: 39.8628, longitude: -4.0273 },
      features: [
        { key: 'luz', label: 'Muy luminoso', icon: 'white-balance-sunny' },
        { key: 'terraza', label: 'Pequeña terraza', icon: 'balcony' },
      ],
    },
    9: {
      address: 'Calle Reyes Católicos, 33, Granada',
      coords: { latitude: 37.1740, longitude: -3.5996 },
      features: [
        { key: 'dormitorios', label: '2 habitaciones', icon: 'bed-outline' },
        { key: 'baños', label: '1 baño', icon: 'shower' },
        { key: 'patio', label: 'Patio interior', icon: 'home-floor-0' },
      ],
    },
    10: {
      address: 'Calle Emilio Lemos, 12, Sevilla',
      coords: { latitude: 37.4086, longitude: -5.9181 },
      features: [
        { key: 'dormitorios', label: '3 dormitorios', icon: 'bed-outline' },
        { key: 'parking', label: 'Garaje privado', icon: 'garage-variant' },
      ],
    },
    11: {
      address: 'Avenida del Puerto, 280, Valencia',
      coords: { latitude: 39.4601, longitude: -0.3354 },
      features: [
        { key: 'ático', label: 'Ático con vistas', icon: 'binoculars' },
        { key: 'terraza', label: 'Gran terraza', icon: 'balcony' },
      ],
    },
    12: {
      address: 'Carrer de Verdi, 45, Barcelona',
      coords: { latitude: 41.4057, longitude: 2.1592 },
      features: [
        { key: 'exclusivo', label: 'Diseño exclusivo', icon: 'diamond-stone' },
        { key: 'baños', label: '2 baños', icon: 'shower' },
      ],
    },
    13: {
      address: 'Calle Toro, 9, Salamanca',
      coords: { latitude: 40.9642, longitude: -5.6637 },
      features: [
        { key: 'estudio', label: 'Estudio compacto', icon: 'laptop' },
        { key: 'terraza', label: 'Con balcón', icon: 'balcony' },
      ],
    },
    14: {
      address: 'Calle Corrida, 22, Gijón',
      coords: { latitude: 43.5420, longitude: -5.6647 },
      features: [
        { key: 'familia', label: 'Ideal para familias', icon: 'account-group' },
        { key: 'jardin', label: 'Pequeño jardín', icon: 'tree-outline' },
      ],
    },
    15: {
      address: 'Calle Uría, 50, Oviedo',
      coords: { latitude: 43.3619, longitude: -5.8483 },
      features: [
        { key: 'reformado', label: 'Piso recientemente reformado', icon: 'hammer' },
        { key: 'dormitorios', label: '2 dormitorios', icon: 'bed-outline' },
      ],
    },
  };

  return {
    type: GET_APARTMENT_DESCRIPTION,
    payload: {
      id,
      ...descriptions[id],
    },
  };
};

export const setApartmentRating = (apartmentId, ratingData) => ({
  type: SET_APARTMENT_RATING,
  payload: { apartmentId, ratingData }
});

