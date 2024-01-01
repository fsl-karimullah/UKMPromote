import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Routes from './app/routes/index';
type Props = {}

const App = (props: Props) => {
  return (
    <>
    <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
     <Routes />
    </>
  ) 
}

export default App