import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';
import SplashScreen from './app/screens/SplashScreen/SplashScreen';
import Routes from './app/routes/index';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './app/redux/configureStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {registerUser} from './app/redux/slices/userSlices';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // useEffect(() => {
  //  const removeValue = async () => {
  //     try {
  //       await AsyncStorage.removeItem('@userToken')
  //     } catch(e) {
  //       console.log(e);
  //     }
    
  //     console.log('Done.')
  //   }
  //   removeValue()
  // }, []);

  return ( 
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />

      <Routes />
      <Toast />
    </Provider>
  );
};

export default App;
