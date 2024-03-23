import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';

const NearbyShopCard = ({ name, distance, likes_count, address, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.likesContainer}>
          <Icon name="heart" size={14} color={COLOR_PRIMARY} style={styles.heartIcon} />
          <Text style={styles.likesText}>{likes_count}</Text>
        </View>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.footer}>
          <View style={styles.distanceContainer}>
            <Icon name="map-marker-alt" size={14} color={COLOR_PRIMARY} />
            <Text style={styles.distanceText}>Sekitar {distance} km</Text>
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
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  heartIcon: {
    marginRight: 4,
  },
  likesText: {
    fontSize: 14,
    color: COLOR_PRIMARY,
    fontFamily: InterBold,
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
