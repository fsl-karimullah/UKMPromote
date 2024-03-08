// NearbyShopCard.js

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';

const NearbyShopCard = ({ name, distance, category, address, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{category}</Text>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.footer}>
          <View style={styles.distanceContainer}>
            <Icon name="map-marker-alt" size={14} color={COLOR_PRIMARY} />
            <Text style={styles.distanceText}>{distance} km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(90),
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
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
  address: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    fontFamily: InterMedium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    marginLeft: 4,
    color: COLOR_PRIMARY,
    fontFamily: InterMedium,
  },
});

export default NearbyShopCard;
