import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { getApartments, getApartmentDescription } from '../redux/ActionCreators';
import { useNavigation } from '@react-navigation/native';

export default function ApartmentMap() {
  const apartments = useSelector((state) => state.apartmentState.apartments);
  const descriptions = useSelector((state) => state.descripcion.descriptions);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const initialRegion = {
    latitude: 40.0,
    longitude: -3.5,
    latitudeDelta: 6,
    longitudeDelta: 6,
  };

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  useEffect(() => {
    if (apartments.length) {
      apartments.forEach((apt) => {
        if (!descriptions[apt.id]) {
          dispatch(getApartmentDescription(apt.id));
        }
      });
    }
  }, [apartments, descriptions]);

  const apartmentsWithCoords = apartments.filter((apt) => {
    const coords = descriptions[apt.id]?.coords;
    return coords && typeof coords.latitude === 'number' && typeof coords.longitude === 'number';
  });

  const handleNavigate = (apt) => {
    navigation.navigate('Apartamentos', {
      screen: 'ApartmentDetail',
      params: { id: apt.id, name: apt.name },
    });
  };

  if (apartmentsWithCoords.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      
      <Text style={styles.overlayText}>
        🗺️ Navega y descubre los apartamentos disponibles
      </Text>

      <MapView style={styles.map} initialRegion={initialRegion}>
        {apartmentsWithCoords.map((apt) => (
          <Marker
            key={apt.id}
            coordinate={descriptions[apt.id].coords}
            title={apt.name}
          >
            <Callout onPress={() => handleNavigate(apt)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{apt.name}</Text>
                <Text style={styles.calloutLink}>Ver detalle</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  overlayText: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  callout: {
    width: 160,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  calloutLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
});
