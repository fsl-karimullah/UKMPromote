import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'; // Import the shimmer placeholder

const ShopCard = ({ title, subtitle, image, isPopular, onPress, isLoading }) => {
  return (
    <ShimmerPlaceholder
      style={styles.container}
      visible={isLoading} 
    >
      <ImageBackground source={{ uri: image }} style={styles.imageContainer}>
        <Pressable onPress={onPress} style={styles.contentContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ShimmerPlaceholder style={styles.titlePlaceholder} />
              <ShimmerPlaceholder style={styles.subtitlePlaceholder} />
            </View>
          ) : (
            <>
              {isPopular && (
                <View style={styles.popularContainer}>
                  <Icon name="fire" size={30} color={COLOR_PRIMARY} />
                </View>
              )}
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </>
          )}
        </Pressable>
      </ImageBackground>
    </ShimmerPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(30),
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontFamily: InterBold,
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
    fontFamily: InterMedium,
  },
  popularContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  loadingContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flex: 1,
  },
  titlePlaceholder: {
    width: '70%',
    height: 20,
    borderRadius: 4,
    marginBottom: 4,
  },
  subtitlePlaceholder: {
    width: '50%',
    height: 16,
    borderRadius: 4,
    marginBottom: 4,
  },
});

export default ShopCard;
