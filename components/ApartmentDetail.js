import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function ApartmentDetail({ route }) {
  const { id, name } = route.params;
  const description = useSelector(state => state.descripcion.descriptions[id]);
  const apartmentImages = {
    1: require('../assets/images/apartments/1.png'),
    2: require('../assets/images/apartments/2.png'),
    3: require('../assets/images/apartments/3.png'),
    4: require('../assets/images/apartments/4.png'),
    5: require('../assets/images/apartments/5.png'),
    6: require('../assets/images/apartments/6.png'),
    7: require('../assets/images/apartments/7.png'),
    8: require('../assets/images/apartments/8.png'),
    9: require('../assets/images/apartments/9.png'),
    10: require('../assets/images/apartments/10.png'),
    11: require('../assets/images/apartments/11.png'),
    12: require('../assets/images/apartments/12.png'),
    13: require('../assets/images/apartments/13.png'),
    14: require('../assets/images/apartments/14.png'),
    15: require('../assets/images/apartments/15.png'),
  };

  const imageSource = apartmentImages[id];

  const navigation = useNavigation();
  if (!description) {
    return (
      <ImageBackground
        source={require('../assets/images/fondo_pantalla.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text>Información no disponible.</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/fondo_pantalla.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()} 
        >
          <View style={styles.backButtonContainer}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <Text style={styles.backButtonText}>Back</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <Image source={imageSource} style={styles.apartmentImage} resizeMode="cover" />
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.address}>{description.address}</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000', 
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30, 
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10, 
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop:-80,
  },
  apartmentImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  address: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
});
