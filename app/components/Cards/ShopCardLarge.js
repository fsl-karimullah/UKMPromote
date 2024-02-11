import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';

const ShopCard = ({ title, subtitle, image, isPopular, anotherData }) => {
  const hasLongAddress = subtitle.length > 30;

  return (
    <View style={[styles.container, { borderBottomLeftRadius: hasLongAddress ? 8 : 8, borderBottomRightRadius: hasLongAddress ? 8 : 8 }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.contentContainer}>
        {isPopular && (
          <View style={styles.popularContainer}>
            <Icon name="fire" size={30} color={COLOR_PRIMARY} />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.anotherData}>{anotherData}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(60),
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2, // Add elevation for a shadow effect (Android)
  },
  image: {
    width: '100%',
    height: heightPercentageToDP(20),
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: InterBold,
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: InterMedium,
  },
  anotherData: {
    fontSize: 14,
    color: COLOR_PRIMARY,
    fontFamily: InterMedium,
  },
  popularContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default ShopCard;
