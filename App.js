// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import SplashScreen from './app/screens/SplashScreen/SplashScreen';
import Routes from './app/routes/index';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/redux/configureStore';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
        <Routes />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
