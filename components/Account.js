import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { login, register, logout } from '../firebase/auth';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export default function Account() {
  const [mode, setMode] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const refreshUser = async () => {
        const user = auth.currentUser;
        if (user) {
          await fetchUserData(user.uid);
        }
      };
      refreshUser();
    }, [])
  );

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'usuarios', uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const imageToBase64 = async (uri) => {
    try {
      return await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } catch (err) {
      Alert.alert('Error', 'No se pudo convertir la imagen.');
      return null;
    }
  };

  const uploadToImgur = async (base64Image) => {
    try {
      const response = await axios.post(
        'https://api.imgur.com/3/image',
        {
          image: base64Image,
          type: 'base64',
        },
        {
          headers: {
            Authorization: 'Client-ID 95a39a9f5968fcb',
          },
        }
      );
      return response.data.data.link;
    } catch (error) {
      console.error('Error subiendo a Imgur:', error);
      throw new Error('No se pudo subir la imagen.');
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
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
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
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
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

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('¡Bienvenid@!', `Hola, ${email.split('@')[0]}`);
    } catch (err) {
      Alert.alert('Error', mapFirebaseError(err));
    }
  };

  const handleRegister = async () => {
    try {
      if (!photo) {
        Alert.alert('Foto requerida', 'Por favor, selecciona una foto para tu perfil.');
        return;
      }
      if (!nombre || !apellidos || !edad || !telefono || !ciudad || !codigoPostal) {
        Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos.');
        return;
      }

      const base64 = await imageToBase64(photo);
      const imgurUrl = await uploadToImgur(base64);

      const userCredential = await register(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        email: user.email,
        nombre,
        apellidos,
        edad,
        telefono,
        ciudad,
        codigoPostal,
        fotoURL: imgurUrl,
      });

      Alert.alert('¡Registro exitoso!', 'Tu cuenta ha sido creada.');
    } catch (err) {
      console.error('ERROR guardando en Firestore:', err);
      Alert.alert('Error', mapFirebaseError(err));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('¡Hasta pronto!', 'Sesión cerrada correctamente.');
    } catch (err) {
      Alert.alert('Error', mapFirebaseError(err));
    }
  };

  const mapFirebaseError = (err) => {
    if (err.code === 'auth/invalid-email') return 'Correo electrónico inválido.';
    if (err.code === 'auth/user-not-found') return 'No se encontró un usuario con ese correo.';
    if (err.code === 'auth/wrong-password') return 'Contraseña incorrecta.';
    if (err.code === 'auth/weak-password') return 'La contraseña debe tener al menos 6 caracteres.';
    if (err.code === 'auth/email-already-in-use') return 'Este correo ya está registrado.';
    if (err.code === 'auth/requires-recent-login') return 'Debes volver a iniciar sesión para cambiar tu contraseña.';
    return 'Error desconocido. Inténtalo de nuevo.';
  };

  const handleBack = () => {
    if (mode) {
      setMode(null);
      setEmail('');
      setPassword('');
      setNombre('');
      setApellidos('');
      setEdad('');
      setTelefono('');
      setCiudad('');
      setCodigoPostal('');
      setPhoto(null);
    } else {
      navigation.goBack();
    }
  };

  return (
    <ImageBackground source={require('../assets/images/fondo_cuenta.png')} style={styles.background} resizeMode="cover">
      {(mode || currentUser) && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <View style={styles.backButtonContainer}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <Text style={styles.backButtonText}>Back</Text>
          </View>
        </TouchableOpacity>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!currentUser && !mode && (
          <>
            <Text style={styles.title}>¡Bienvenid@!</Text>
            <Text style={styles.description}>
              Accede o crea una cuenta para guardar tus datos y personalizar tu experiencia. 
              También podrás añadir valoraciones a los apartamentos.
            </Text>
            <TouchableOpacity style={styles.evaluateButton} onPress={() => setMode('login')}>
              <Text style={styles.evaluateButtonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.evaluateButton} onPress={() => setMode('register')}>
              <Text style={styles.evaluateButtonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </>
        )}
        {mode && !currentUser && (
          <>
            <Text style={styles.subtitle}>
              {mode === 'login' ? 'Introduce tus datos para acceder' : 'Rellena todos los campos y sube tu foto'}
            </Text>
            {mode === 'register' && (
              <>
                {!photo && (
                  <TouchableOpacity style={styles.button} onPress={choosePhoto}>
                    <Text style={styles.buttonText}>Añadir foto de perfil</Text>
                  </TouchableOpacity>
                )}
                {photo && (
                  <Image source={{ uri: photo }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 10 }} />
                )}
                <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                <TextInput style={styles.input} placeholder="Apellidos" value={apellidos} onChangeText={setApellidos} />
                <TextInput style={styles.input} placeholder="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="Ciudad" value={ciudad} onChangeText={setCiudad} />
                <TextInput style={styles.input} placeholder="Código postal" value={codigoPostal} onChangeText={setCodigoPostal} keyboardType="numeric" />
              </>
            )}
            <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
            <TouchableOpacity style={styles.evaluateButton} onPress={mode === 'login' ? handleLogin : handleRegister}>
              <Text style={styles.evaluateButtonText}>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</Text>
            </TouchableOpacity>
          </>
        )}
        {currentUser && (
          <>
            <Text style={styles.title}>¡Hola, {currentUser.email.split('@')[0]}!</Text>
            {userData?.fotoURL && (
              <Image source={{ uri: userData.fotoURL }} style={{ width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginVertical: 10 }} />
            )}
            <Text style={styles.description}>
              Desde aquí puedes modificar tus datos de cuenta y añadir valoraciones a los apartamentos.
            </Text>
            <TouchableOpacity style={styles.evaluateButton} onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.evaluateButtonText}>Ver / Editar perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.evaluateButton} onPress={() => navigation.navigate('Apartamentos')}>
              <Text style={styles.evaluateButtonText}>Valorar apartamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.evaluateButton} onPress={handleLogout}>
              <Text style={styles.evaluateButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 100, paddingBottom: 40 },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
  },
  backButtonText: { color: '#fff', fontSize: 14, marginLeft: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4A90E2', textAlign: 'center', marginBottom: 30 },
  subtitle: { fontSize: 24, color: '#333', textAlign: 'center', marginBottom: 20 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.8)', padding: 15, borderRadius: 10,
    marginBottom: 20, color: 'black',
  },
  button: {
    backgroundColor: 'white', padding: 15, marginVertical: 10, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: '#4A90E2', fontSize: 18, fontWeight: 'bold' },
  evaluateButton: {
    backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 10, alignSelf: 'center', marginVertical: 10,
  },
  evaluateButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  description: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 30, paddingHorizontal: 10 },
});
