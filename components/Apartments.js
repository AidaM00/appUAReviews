import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getApartments } from '../redux/ActionCreators';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Apartments() {
  const dispatch = useDispatch();
  const apartments = useSelector((state) => state.apartmentState.apartments);
  const [expandedId, setExpandedId] = useState(null);
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    dispatch(getApartments());
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderApartment = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>{item.name}</Title>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/fondo_pantalla.png')}  
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <View style={styles.titleBox}>
            <Icon name="home-city" size={28} color="#4a4a4a" style={styles.icon} />
            <Text style={styles.title}>Apartamentos</Text>
          </View>
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
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.3)', 
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center', 
  },
});
