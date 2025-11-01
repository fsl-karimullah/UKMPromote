// BannerSlider.js
import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  bannerContainer: {
    height: heightPercentageToDP(20),
    margin: 20,
  },
  bannerImage: {
    flex: 1,
    borderRadius: 20,
    resizeMode: 'contain',
  },
});
 
const BannerSlider = ({images, onClick}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Pressable style={styles.bannerContainer} onPress={onClick}>
        <Carousel
          width={widthPercentageToDP(90)}
          height={heightPercentageToDP(20)}
          autoPlay={true}
          data={images}
          autoPlayInterval={3000}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({item}) => (
            <View style={{flex: 1, zIndex: 999999}}>
              <Image
                source={{uri: item}}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default BannerSlider;
