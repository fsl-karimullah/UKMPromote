import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import images from '../../resources/images';
import { InterBold } from '../../resources/fonts';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const ComingSoon = ({ releaseDate }) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.ComingSoon}
        style={styles.image}
      />
      <Text style={styles.text}>
        Sayangnya fitur ini masih dalam pengembangan. Stay Tune with US !
      </Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(30),
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    fontFamily:InterBold,
    width:widthPercentageToDP(70)
  },
});

export default ComingSoon;
