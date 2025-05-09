import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { setApartmentRating } from '../redux/ActionCreators';

export default function ApartmentDetail({ route }) {
  const { id, name } = route.params;
  const description = useSelector(state => state.descripcion.descriptions[id]);
  const features = description?.features || [];

  const [showEvaluation, setShowEvaluation] = useState(false);
  const [newRating, setNewRating] = useState({
    Ubicación: 5,
    Ambiente: 5,
    Limpieza: 5,
    Iluminación: 5,
    Comodidad: 5,
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const handleRatingSubmit = () => {
    dispatch(setApartmentRating(id, {
      userId: 'anon',
      ratings: newRating,
    }));
    Alert.alert('¡Gracias!', 'Tu valoración ha sido registrada.');
    setShowEvaluation(false);
  };

  if (!description) {
    return (
      <ImageBackground
        source={require('../assets/images/fondo_pantalla.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.centered}>
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
      {/* Botón de volver fijo */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.backButtonContainer}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </View>
      </TouchableOpacity>

      {/* Contenido desplazable */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card 1: Info */}
        <View style={styles.card}>
          <Image source={imageSource} style={styles.apartmentImage} resizeMode="cover" />
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.address}>{description.address}</Text>

          <View style={styles.features}>
            {features.map((item) => (
              <View key={item.key} style={styles.featureRow}>
                <Icon name={item.icon} size={24} color="#4a4a4a" style={styles.featureIcon} />
                <Text style={styles.featureText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Botón */}
        <TouchableOpacity
          onPress={() => setShowEvaluation(!showEvaluation)}
          style={styles.evaluateButton}
        >
          <Text style={styles.evaluateButtonText}>
            {showEvaluation ? 'Cancelar evaluación' : 'Evaluar apartamento'}
          </Text>
        </TouchableOpacity>

        {/* Card 2: Evaluación */}
        {showEvaluation && (
          <View style={[styles.card, { marginTop: 20 }]}>
            <Text style={styles.title}>Evaluar este apartamento</Text>
            {Object.keys(newRating).map((key) => (
              <View key={key} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {newRating[key]}
                </Text>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  value={newRating[key]}
                  onValueChange={(value) =>
                    setNewRating({ ...newRating, [key]: value })
                  }
                />
              </View>
            ))}
            <Button title="Enviar valoración" onPress={handleRatingSubmit} />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 40,
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
    marginBottom: 20,
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
  features: {
    marginTop: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
  evaluateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  evaluateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
