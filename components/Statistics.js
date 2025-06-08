import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Modal, Pressable } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import BackToHomeButton from './BackToHomeButton';

const criterios = ['Ubicación', 'Ambiente', 'Limpieza', 'Iluminación', 'Comodidad'];

export default function Statistics() {
  const [valoraciones, setValoraciones] = useState([]);
  const [ratingsByApartment, setRatingsByApartment] = useState({});
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Obtener usuario actual
    const currentUser = auth.currentUser;
    setUserId(currentUser ? currentUser.uid : null);

    const fetchValoraciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'valoraciones'));
        const datos = querySnapshot.docs.map(doc => doc.data());

        // Agrupar por apartmentId
        const agrupadas = datos.reduce((acc, curr) => {
          const id = curr.apartmentId;
          if (!acc[id]) acc[id] = [];
          acc[id].push(curr);
          return acc;
        }, {});
        setValoraciones(datos);
        setRatingsByApartment(agrupadas);
      } catch (error) {
        console.error('Error al obtener valoraciones:', error);
      }
    };

    fetchValoraciones();
  }, []);

  const allRatings = valoraciones;
  const totalVotos = allRatings.length;

  const promedios = criterios.reduce((acc, criterio) => {
    const values = allRatings.map(r => r.ratings[criterio]).filter(Boolean);
    const average = values.length > 0
      ? (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2)
      : 'N/A';
    acc[criterio] = { average };
    return acc;
  }, {});

  const showApartmentRatings = (id) => {
    setSelectedApartmentId(id);
    setModalVisible(true);
  };

  const apartmentRatings = selectedApartmentId ? (ratingsByApartment[selectedApartmentId] || []) : [];

  const resumen = criterios.reduce((acc, criterio) => {
    const valores = apartmentRatings.map(r => r.ratings[criterio]).filter(Boolean);
    acc[criterio] = valores.length > 0
      ? (valores.reduce((s, v) => s + v, 0) / valores.length).toFixed(2)
      : 'N/A';
    return acc;
  }, {});

  const apartmentScores = Object.entries(ratingsByApartment).map(([id, ratings]) => {
    const promedioGlobal = ratings.reduce((sum, r) => {
      const total = criterios.reduce((a, c) => a + r.ratings[c], 0);
      return sum + total / criterios.length;
    }, 0) / ratings.length;

    return {
      id: parseInt(id),
      name: `Apartamento ${id}`,
      score: promedioGlobal.toFixed(2),
    };
  });

  const top3 = apartmentScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const medals = ['🥇', '🥈', '🥉'];

  // Valoraciones del usuario actual
  const misValoraciones = userId
    ? valoraciones.filter(v => v.userId === userId)
    : [];

  const resumenUsuario = criterios.reduce((acc, criterio) => {
    const valores = misValoraciones.map(r => r.ratings[criterio]).filter(Boolean);
    acc[criterio] = valores.length > 0
      ? (valores.reduce((s, v) => s + v, 0) / valores.length).toFixed(2)
      : 'N/A';
    return acc;
  }, {});

  return (
    <ImageBackground
      source={require('../assets/images/fondo_pantalla.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <BackToHomeButton />
        <Text style={styles.introText}>
          Aquí puedes consultar un resumen de las valoraciones realizadas por los usuarios,
          tanto de forma general como por cada apartamento.
        </Text>

        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Sección: Top 3 */}
          {top3.length > 0 && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>🏆 Mejores apartamentos valorados</Text>
              <Text style={styles.label}>Estos son los apartamentos favoritos de los usuarios:</Text>
              {top3.map((apt, index) => (
                <Text key={apt.id} style={styles.topItem}>
                  {medals[index]} {apt.name} — {apt.score}
                </Text>
              ))}
            </View>
          )}

          {/* Sección: Valoraciones generales */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>
              ⭐ Valoraciones generales ({totalVotos} votos)
            </Text>
            {criterios.map((key) => (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{key}:</Text>
                <Text style={styles.value}>{promedios[key].average}</Text>
              </View>
            ))}

            <BarChart
              data={{
                labels: ['Ubic.', 'Amb.', 'Limp.', 'Ilum.', 'Comod.'],
                datasets: [
                  {
                    data: criterios.map((c) =>
                      promedios[c].average === 'N/A' ? 0 : parseFloat(promedios[c].average)
                    ),
                  },
                ],
              }}
              width={Dimensions.get('window').width - 60}
              height={220}
              fromZero
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                barPercentage: 0.5,
                propsForLabels: {
                  fontSize: 12,
                  dx: -5,
                  fontWeight: 'bold',
                },
                propsForBackgroundLines: {
                  strokeWidth: 0,
                },
              }}
              style={{
                marginTop: 20,
                borderRadius: 10,
                marginLeft: -5,
              }}
            />
          </View>

          {/* Sección: Por apartamento */}
          <View style={styles.sectionBox}>
            <Text style={styles.sectionTitle}>🏠 Por apartamento</Text>
            <Text style={styles.label}>Selecciona un apartamento para conocer su puntuación:</Text>
            <View style={styles.buttonsContainer}>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((id) => {
                const hasRatings = !!ratingsByApartment[id];
                return (
                  <TouchableOpacity
                    key={id}
                    style={[
                      styles.apartmentButton,
                      {
                        backgroundColor: hasRatings ? '#007AFF' : '#B3D7FF',
                      },
                    ]}
                    onPress={() => showApartmentRatings(id)}
                  >
                    <Text style={styles.apartmentButtonText}>Apart. {id}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Sección: Mis valoraciones (solo si está logueado) */}

          {userId && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>📝 Mis valoraciones</Text>
              {misValoraciones.length === 0 ? (
                <Text style={styles.noRatings}>Aún no has valorado ningún apartamento.</Text>
              ) : (
                <>
                  {Object.entries(
                    misValoraciones.reduce((acc, val) => {
                      const id = val.apartmentId;
                      const total = criterios.reduce((suma, crit) => suma + val.ratings[crit], 0);
                      if (!acc[id]) acc[id] = { sum: 0, count: 0 };
                      acc[id].sum += total / criterios.length;
                      acc[id].count += 1;
                      return acc;
                    }, {})
                  ).map(([id, data]) => {
                    const media = (data.sum / data.count).toFixed(2);
                    return (
                      <View key={id} style={styles.row}>
                        <Text style={styles.value}>🏢 Apartamento {id}</Text>
                        <Text style={styles.label}>📊 Media: {media}</Text>
                      </View>
                    );
                  })}
                </>
              )}
            </View>
          )}

        </ScrollView>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Valoraciones del apartamento {selectedApartmentId}</Text>
              {apartmentRatings.length === 0 ? (
                <Text style={styles.noRatings}>Este apartamento aún no tiene valoraciones.</Text>
              ) : (
                <>
                  {criterios.map((key) => (
                    <Text key={key} style={styles.modalStat}>
                      {key}: {resumen[key]}
                    </Text>
                  ))}
                  <Text style={styles.modalStat}>
                    Total votos: {apartmentRatings.length}
                  </Text>
                </>
              )}
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  introText: {
    marginTop: 80,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
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
  apartmentButton: {
    width: 90,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  apartmentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  noRatings: {
    fontStyle: 'italic',
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalStat: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  topItem: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
});
