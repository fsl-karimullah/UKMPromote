import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';

const ShopCard = ({ title, subtitle, image, isPopular }) => {
  return (
    <ImageBackground source={{ uri: image }} style={styles.container}>
      <View style={styles.contentContainer}>
        {isPopular && (
          <View style={styles.popularContainer}>
            <Icon name="fire" size={30} color={COLOR_PRIMARY} />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(30),
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 8,
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
});

export default ShopCard;
