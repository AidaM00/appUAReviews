import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux';
import DrawerNavigation from './navigation/DrawerNavigation'; 

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigation />  
      </NavigationContainer>
    </Provider>
  );
}
