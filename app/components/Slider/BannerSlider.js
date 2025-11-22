// BannerSlider.js
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const {width} = Dimensions.get('window');

const BannerSlider = ({images, onClick}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <Pressable style={styles.bannerContainer} onPress={onClick}>
          <Carousel
            width={widthPercentageToDP(92)}
            height={heightPercentageToDP(25)} // bigger
            autoPlay
            autoPlayInterval={3000}
            loop
            pagingEnabled
            data={images}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Image source={{uri: item}} style={styles.bannerImage} />
              </View>
            )}
          />
        </Pressable>

        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View key={index} style={styles.paginationDot} />
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  bannerContainer: {
    width: widthPercentageToDP(92),
    height: heightPercentageToDP(25), // increase size
    borderRadius: 20,
    overflow: 'hidden', // smooth edges
    backgroundColor: '#F3F4F6', // fallback bg
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'center',
    gap: 6,
  },
  paginationDot: {
    width: 8,
    height: 8,
    backgroundColor: '#D1D5DB',
    borderRadius: 50,
  },
});

export default BannerSlider;
