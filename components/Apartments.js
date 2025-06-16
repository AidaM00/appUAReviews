import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getApartments, getApartmentDescription } from '../redux/ActionCreators';
import { Card, Title } from 'react-native-paper';
import BackToHomeButton from './BackToHomeButton';

export default function Apartments({ navigation }) {
  const dispatch = useDispatch();
  const apartments = useSelector((state) => state.apartmentState.apartments);
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  const handlePress = (item) => {
    dispatch(getApartmentDescription(item.id));
    navigation.navigate('Detalles', {
      id: item.id,
      name: item.name,
      from: 'Apartamentos',
    });
  };

  const renderApartment = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>{item.id} - {item.name}</Title>

        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/images/fondo_pantalla.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <BackToHomeButton />

      <View style={styles.overlay}>
        {/* Encabezado + botón mapa */}
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Explora los apartamentos disponibles. También puedes ver su ubicación en el mapa interacivo pulsando el siguiente botón:
          </Text>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => navigation.navigate('Mapa interactivo')}
          >
            <Text style={styles.mapButtonText}>Ver mapa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <TextInput
            style={styles.filterInput}
            placeholder="Filtrar por nombre"
            value={cityFilter}
            onChangeText={setCityFilter}
          />
        </View>

        <FlatList
          data={apartments.filter((item) =>
            item.name.toLowerCase().includes(cityFilter.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderApartment}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, padding: 20, backgroundColor: 'rgba(255,255,255,0.3)' },

  icon: { marginRight: 8 },

  introContainer: {
    marginTop: 80,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 10,
    padding: 10,
    
  },
  introText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  mapButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  filterContainer: { marginBottom: 20, alignItems: 'center' },
  filterInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
