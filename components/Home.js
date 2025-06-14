import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/fondo_home.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.centeredContainer}>
          <View style={styles.transparentBox}>
            <Text style={styles.title}>Bienvenido a UAReviews</Text>
            <Text style={styles.subtitle}>Tu plataforma de reseñas de apartamentos</Text>

            <Text style={[styles.paragraph, styles.blackText]}>
              En UAReviews, te ofrecemos una plataforma completa donde podrás encontrar reseñas detalladas sobre los mejores apartamentos en tu ciudad. ¡Explora las valoraciones, elige con confianza y encuentra tu nuevo hogar ideal!
            </Text>
          </View>

          {/* Lista */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.badge}><Text style={styles.badgeText}>1</Text></View>
              <Text style={styles.cardIntro}>Consulta la lista completa de apartamentos disponibles.</Text>
            </View>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate('Apartamentos')}
            >
              <Text style={styles.buttonText}>Ver apartamentos</Text>
            </TouchableOpacity>
          </View>

          {/* Estadisticas */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
              <Text style={styles.cardIntro}>Revisa las estadísticas globales y por apartamento.</Text>
            </View>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate('Estadísticas')}
            >
              <Text style={styles.buttonText}>Estadísticas</Text>
            </TouchableOpacity>
          </View>

          {/* Mapa */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
              <Text style={styles.cardIntro}>Explora la ubicación de los apartamentos en el mapa.</Text>
            </View>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate('Mapa interactivo')}
            >
              <Text style={styles.buttonText}>Mapa interactivo</Text>
            </TouchableOpacity>
          </View>

          {/* Mi cuenta */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.badge}><Text style={styles.badgeText}>4</Text></View>
              <Text style={styles.cardIntro}>Accede a tu perfil y configuración de cuenta.</Text>
            </View>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate('Mi cuenta')}
            >
              <Text style={styles.buttonText}>Mi cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
  },
  transparentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginTop: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
  blackText: {
    color: '#000',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#007AFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardIntro: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  cardButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
