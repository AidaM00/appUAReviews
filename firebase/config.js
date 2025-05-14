import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpbfbijuo68y-b67tSRAwe5gpN64Te_eY",
  authDomain: "uareviews-e31db.firebaseapp.com",
  projectId: "uareviews-e31db",
  storageBucket: "uareviews-e31db.appspot.com",
  messagingSenderId: "533468826878",
  appId: "1:533468826878:web:c7754c5dff6242141529af",
  measurementId: "G-N29STC4CFM"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db }; 
