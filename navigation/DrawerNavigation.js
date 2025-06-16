import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Image, StyleSheet } from 'react-native';

// Componentes de pantalla
import Home from '../components/Home';
import Apartments from '../components/Apartments';
import ApartmentDetail from '../components/ApartmentDetail';
import Statistics from '../components/Statistics';
import ApartmentMap from '../components/ApartmentMap';
import Account from '../components/Account';
import Profile from '../components/Profile';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Inicio"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Apartamentos"
        component={Apartments}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="business-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Detalles"
        component={ApartmentDetail}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="Estadísticas"
        component={Statistics}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="bar-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mapa interactivo"
        component={ApartmentMap}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mi cuenta"
        component={Account}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Profile}
        options={{
          drawerItemStyle: { display: 'none' }, 
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});
