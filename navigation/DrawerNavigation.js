import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home';
import Apartments from '../components/Apartments';
import Statistics from '../components/Statistics';
import Account from '../components/Account';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={Home} />
        <Drawer.Screen name="Apartamentos" component={Apartments} />
        <Drawer.Screen name="Estadísticas" component={Statistics} />
        <Drawer.Screen name="Mi cuenta" component={Account} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
