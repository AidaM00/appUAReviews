import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Statistics() {
  const ratingsByApartment = useSelector(
    (state) => state.ratings.ratingsByApartment
  );

  const allRatings = Object.values(ratingsByApartment).flat();
  const criterios = ['ubicacion', 'ambiente', 'limpieza', 'iluminacion', 'comodidad'];

  const promedios = criterios.reduce((acc, criterio) => {
    const values = allRatings.map(r => r.ratings[criterio]).filter(Boolean);
    const average =
      values.length > 0
        ? (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2)
        : 'N/A';
    const total = values.length;
    acc[criterio] = { average, total };
    return acc;
  }, {});

  return (
    <ImageBackground
      source={require('../assets/images/fondo_pantalla.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Título con icono */}
        <View style={styles.titleContainer}>
          <View style={styles.titleBox}>
            <Icon name="chart-bar" size={28} color="#4a4a4a" style={styles.icon} />
            <Text style={styles.title}>Estadísticas</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Sección: Valoraciones generales */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>⭐ Valoraciones generales</Text>
            {criterios.map((key) => (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Text>
                <Text style={styles.value}>
                  {promedios[key].average} (votos: {promedios[key].total})
                </Text>
              </View>
            ))}
          </View>

          {/* Sección: Por apartamento */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>🏠 Por apartamento</Text>
            {Object.keys(ratingsByApartment).length === 0 ? (
              <Text style={styles.noRatings}>
                Aún no hay valoraciones registradas.
              </Text>
            ) : (
              Object.entries(ratingsByApartment).map(([id, ratings]) => {
                const total = ratings.length;
                const resumen = criterios.reduce((acc, criterio) => {
                  const valores = ratings.map(r => r.ratings[criterio]).filter(Boolean);
                  const avg =
                    valores.length > 0
                      ? (valores.reduce((s, v) => s + v, 0) / valores.length).toFixed(2)
                      : 'N/A';
                  acc[criterio] = avg;
                  return acc;
                }, {});
                return (
                  <View key={id} style={{ marginBottom: 15 }}>
                    <Text style={styles.apartmentTitle}>Apartamento #{id}</Text>
                    {criterios.map((c) => (
                      <Text key={c} style={styles.smallStat}>
                        {c}: {resumen[c]}
                      </Text>
                    ))}
                    <Text style={styles.smallStat}>Total votos: {total}</Text>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
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
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
  },
  icon: { marginRight: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  scrollContent: {
    paddingBottom: 30,
  },
  sectionBox: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  apartmentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  smallStat: {
    fontSize: 14,
    color: '#555',
  },
  noRatings: {
    fontStyle: 'italic',
    color: '#666',
  },
});
