import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore'; 
import DrawerNavigation from './navigation/DrawerNavigation'; 

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />  
      </NavigationContainer>
    </Provider>
  );
  
}
