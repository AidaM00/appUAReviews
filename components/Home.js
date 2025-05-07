import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

export default function Home() {
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
              En UAReviews, te ofrecemos una plataforma completa donde podrás encontrar reseñas detalladas sobre los mejores apartamentos en tu ciudad. Con la ayuda de nuestros usuarios, podrás tomar decisiones informadas para encontrar el hogar ideal.
            </Text>

            <Text style={[styles.paragraph, styles.blackText]}>
              Ya sea que estés buscando un lugar tranquilo para vivir, o un apartamento moderno en el corazón de la ciudad, en UAReviews te ayudamos a encontrar lo que necesitas. ¡Explora las reseñas y comienza a hacer tu búsqueda hoy mismo!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0%',
  },
  transparentBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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
});
