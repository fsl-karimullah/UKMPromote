import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
  },
  cardImageVertical: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTextContainerVertical: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  cardAddress: {
    fontSize: 14,
    color: '#555',
  },
  cardIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotIcon: {
    color: 'red',
    marginRight: 5,
  },
  favoriteIcon: {
    fontSize: 20,
    marginLeft: 5,
  },
});

export default ShopCardVertical;
