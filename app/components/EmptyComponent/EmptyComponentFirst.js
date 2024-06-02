import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import images from '../../resources/images';
import { InterBold } from '../../resources/fonts';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const EmptyComponentFirst = () => {
  return (
    <View style={styles.container}>
      <Image source={images.EmptyImage} style={styles.image} />
      <Text style={styles.text}>Yah Anda belum menambahkan toko ke favorit :(</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: widthPercentageToDP(50), 
    height: widthPercentageToDP(50), 
    resizeMode: 'contain',
  },
  text: {
    fontSize: 15,
    color: 'black',
    marginTop: 10,
    fontFamily:InterBold
  },
});

export default EmptyComponentFirst;
