import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const ShopCardVertical = ({ title, subtitle, image, isHot, address, onFavoritePress }) => (
  <View style={styles.cardContainerVertical}>
    <Image source={{ uri: image }} style={styles.cardImageVertical} />

    <View style={styles.cardTextContainerVertical}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <Text style={styles.cardAddress}>{address}</Text>
    </View>

    <View style={styles.cardIconsContainer}>
      {isHot && <Text style={styles.hotIcon}>Hot</Text>}
      <TouchableOpacity onPress={onFavoritePress}>
        <Text style={styles.favoriteIcon}>❤️</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainerVertical: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    width: widthPercentageToDP(45), 
  },
  cardImageVertical: {
    width: '100%',
    height: 120, 
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTextContainerVertical: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14, 
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 12, 
    color: '#555',
  },
  cardAddress: {
    fontSize: 12, 
    color: '#555',
  },
  cardIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotIcon: {
    color: 'red',
    fontSize: 12, 
    marginRight: 5,
  },
  favoriteIcon: {
    fontSize: 16, 
    marginLeft: 5,
  },
});

export default ShopCardVertical;
