import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';
import DrawerNavigation from './navigation/DrawerNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <DrawerNavigation />
      
    </Provider>
  );
}
