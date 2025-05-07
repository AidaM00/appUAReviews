import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../components/Home';
import Apartments from '../components/Apartments';
import Statistics from '../components/Statistics';
import Account from '../components/Account';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
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
          name="Estadísticas"
          component={Statistics}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="bar-chart-outline" color={color} size={size} />
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
