import React from 'react';
import { ImageBackground, StyleSheet, View, Text, Image } from 'react-native';
import images from '../../resources/images';
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';

const SplashScreen = ({navigation}) => {

  return (
    <ImageBackground style={styles.background}>
      <View style={styles.container}>
        <Image source={images.logoFirst} style={styles.logo} />
        <Text style={styles.title}>Brand-In Indonesia</Text>
        <Text style={styles.subtitle}>From Sixeyes Technologies</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontFamily: InterBold,
    color:COLOR_PRIMARY
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    fontFamily:InterMedium,
    color:'black'
  },
});

export default SplashScreen;
