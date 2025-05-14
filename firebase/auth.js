import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updatePassword as firebaseUpdatePassword 
} from "firebase/auth";

import { auth } from "./config"; 

// Función para registrar usuario
export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Función para iniciar sesión
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const logout = () => {
  return signOut(auth);
};

// Función para cambiar contraseña
export const updatePassword = (newPassword) => {
  if (auth.currentUser) {
    return firebaseUpdatePassword(auth.currentUser, newPassword);
  } else {
    throw new Error('No hay usuario autenticado.');
  }
};
