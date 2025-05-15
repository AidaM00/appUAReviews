import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { setApartmentRating } from '../redux/ActionCreators';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';

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
  const viewRef = useRef();

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
    dispatch(
      setApartmentRating(id, {
        userId: 'anon',
        ratings: newRating,
      }),
    );
    Alert.alert('¡Gracias!', 'Tu valoración ha sido registrada.');
    setShowEvaluation(false);
  };

  // Función para compartir información del apartamento solo por email usando MailComposer
  const handleShareEmail = async () => {
    try {
      // Captura que vamos a mandar
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.9,
      });

      // Copia la imagen a cache para adjuntarla en el correo
      const fileUri = `${FileSystem.cacheDirectory}apartment-${id}.png`;
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'No hay aplicación de correo disponible.');
        return;
      }

      await MailComposer.composeAsync({
        subject: 'Apartamento UA',
        body: `¡Mira este apartamento "${name}" de la cadena UA!`,
        attachments: [fileUri],
        isHtml: false,
      });
    } catch (error) {
      console.log('Error al compartir por email:', error);
      Alert.alert('Error', 'No se pudo compartir el email.');
    }
  };

  // Función para compartir en otras apps de redes sociales usando Sharing
  const handleShareOther = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.9,
      });

      const fileUri = `${FileSystem.cacheDirectory}apartment-${id}.png`;
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      const shareUri = fileUri.startsWith('file://')
        ? fileUri
        : `file://${fileUri}`;

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'No hay aplicaciones disponibles para compartir.');
        return;
      }

      await Sharing.shareAsync(shareUri, {
        dialogTitle: 'Compartir apartamento',
        mimeType: 'image/png',
        UTI: 'public.png',
        message: `¡Mira este apartamento "${name}" de la cadena UA!`,
      });
    } catch (error) {
      console.log('Error al compartir:', error);
      Alert.alert('Error', 'No se pudo compartir la imagen.');
    }
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View style={styles.backButtonContainer}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View ref={viewRef} collapsable={false}>
          <View style={styles.card}>
            <Image
              source={imageSource}
              style={styles.apartmentImage}
              resizeMode="cover"
            />
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.address}>{description.address}</Text>
            <View style={styles.features}>
              {features.map(item => (
                <View key={item.key} style={styles.featureRow}>
                  <Icon
                    name={item.icon}
                    size={24}
                    color="#4a4a4a"
                    style={styles.featureIcon}
                  />
                  <Text style={styles.featureText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowEvaluation(!showEvaluation)}
          style={styles.evaluateButton}
        >
          <Text style={styles.evaluateButtonText}>
            {showEvaluation ? 'Cancelar evaluación' : 'Evaluar apartamento'}
          </Text>
        </TouchableOpacity>

        {showEvaluation && (
          <View style={[styles.card, { marginTop: 20 }]}>
            <Text style={styles.title}>Evaluar este apartamento</Text>
            {Object.keys(newRating).map(key => (
              <View key={key} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {key}: {newRating[key]}
                </Text>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  value={newRating[key]}
                  onValueChange={value =>
                    setNewRating({ ...newRating, [key]: value })
                  }
                />
              </View>
            ))}
            <Button title="Enviar valoración" onPress={handleRatingSubmit} />
          </View>
        )}

        <View style={styles.shareRow}>
          <TouchableOpacity onPress={handleShareEmail} style={[styles.shareButtonRow, { marginRight: 10 }]}>
            <Icon name="email-send" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.shareButtonText}>Mail</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShareOther} style={[styles.shareButtonRow, { backgroundColor: '#4285F4' }]}>
            <Icon name="share-variant" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.shareButtonText}>Social Media</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  evaluateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  shareButton: {
    marginTop: 10,
    backgroundColor: '#34A853',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  shareButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34A853',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },

});
