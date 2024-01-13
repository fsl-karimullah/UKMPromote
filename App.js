import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Routes from './app/routes/index';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './app/redux/configureStore';


const App = () => {  
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
