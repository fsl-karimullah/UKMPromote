import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import SplashScreen from './app/screens/SplashScreen/SplashScreen';
import Routes from './app/routes/index';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/redux/configureStore';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    const initializeFirebaseMessaging = async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus) {
        console.log('Permission status:', authorizationStatus);
      }

      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
      }

      const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
 
      return unsubscribe;
    };
    
    initializeFirebaseMessaging();
  }, []);

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
