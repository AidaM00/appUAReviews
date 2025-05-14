import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile, reload } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setPhoto(userDoc.data().fotoURL);
        }
      }
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Error al cargar datos.');
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const fileName = result.assets[0].uri.split('/').pop();
      const localUri = FileSystem.documentDirectory + fileName;
      await FileSystem.copyAsync({ from: result.assets[0].uri, to: localUri });
      setPhoto(localUri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para usar la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const fileName = result.assets[0].uri.split('/').pop();
      const localUri = FileSystem.documentDirectory + fileName;
      await FileSystem.copyAsync({ from: result.assets[0].uri, to: localUri });
      setPhoto(localUri);
    }
  };

  const choosePhoto = () => {
    Alert.alert(
      "Seleccionar foto",
      "¿Qué quieres hacer?",
      [
        { text: "Tomar foto", onPress: takePhoto },
        { text: "Elegir de galería", onPress: pickFromGallery },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, 'usuarios', user.uid), {
          ...userData,
          fotoURL: photo,
        });

        await updateProfile(user, { photoURL: photo });
        await reload(user);

        Alert.alert('¡Guardado!', 'Tus cambios fueron aplicados.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar los cambios.');
    }
  };

  if (loading) {
    return (
      <ImageBackground
        source={require('../assets/images/fondo_cuenta.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.centered}>
          <Text>Cargando...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (!userData) {
    return (
      <ImageBackground
        source={require('../assets/images/fondo_cuenta.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.centered}>
          <Text>No se encontraron datos.</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/fondo_cuenta.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Botón de volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <View style={styles.backButtonContainer}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Foto perfil */}
        <TouchableOpacity onPress={choosePhoto} style={{ alignSelf: 'center', marginBottom: 20 }}>
          {photo ? (
            <Image source={{ uri: photo }} style={{ width: 120, height: 120, borderRadius: 60 }} />
          ) : (
            <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: '#ccc' }} />
          )}
        </TouchableOpacity>

        {/* Inputs */}
        <TextInput style={styles.input} placeholder="Nombre" value={userData.nombre} onChangeText={(text) => setUserData({ ...userData, nombre: text })} />
        <TextInput style={styles.input} placeholder="Apellidos" value={userData.apellidos} onChangeText={(text) => setUserData({ ...userData, apellidos: text })} />
        <TextInput style={styles.input} placeholder="Edad" value={userData.edad} keyboardType="numeric" onChangeText={(text) => setUserData({ ...userData, edad: text })} />
        <TextInput style={styles.input} placeholder="Teléfono" value={userData.telefono} keyboardType="phone-pad" onChangeText={(text) => setUserData({ ...userData, telefono: text })} />
        <TextInput style={styles.input} placeholder="Ciudad" value={userData.ciudad} onChangeText={(text) => setUserData({ ...userData, ciudad: text })} />
        <TextInput style={styles.input} placeholder="Código postal" value={userData.codigoPostal} keyboardType="numeric" onChangeText={(text) => setUserData({ ...userData, codigoPostal: text })} />

        {/* Botón guardar */}
        <TouchableOpacity style={styles.evaluateButton} onPress={handleSave}>
          <Text style={styles.evaluateButtonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
  },
  backButtonText: { color: '#fff', fontSize: 14, marginLeft: 10 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    color: 'black',
  },
  evaluateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  evaluateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
