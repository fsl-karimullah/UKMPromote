// ShopSlider.js
import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  bannerContainer: {
    height: heightPercentageToDP(30),
//    width:widthPercentageToDP(100),

  },
  bannerImage: { 
    flex: 1,
    width:widthPercentageToDP(100),
    height:heightPercentageToDP(20)
  },
});

const ShopSlider = ({ images, onClick }) => {
  return (
    <Pressable style={styles.bannerContainer} onPress={onClick}>
      <Carousel
        width={widthPercentageToDP(100)}
        height={heightPercentageToDP(30)} 
        autoPlay={false}
        data={images}
        autoPlayInterval={3000}
        // onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => (
          <View style={{ flex: 1, zIndex:999999 }}>
            <Image source={{ uri: item }} style={styles.bannerImage} resizeMode="cover" />
          </View>
        )}
      />
    </Pressable>
  );
};

export default ShopSlider;
