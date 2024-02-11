import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {InterBold, InterMedium, InterRegular} from '../../resources/fonts';
import { COLOR_PRIMARY, COLOR_RED_TRANSPARENT } from '../../resources/colors';

const ShopCardVertical = ({
  title,
  subtitle,
  image,
  isHot,
  address,
  onFavoritePress,
  onPress,
  customStyle
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.cardTouchable,customStyle]}>
    <View style={styles.cardContainerVertical}>
      <Image source={{uri: image}} style={styles.cardImageVertical} />
      <View style={styles.cardTextContainerVertical}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text
          style={styles.cardSubtitle}
          numberOfLines={2}
          ellipsizeMode="tail">
          {subtitle}
        </Text>
        <Text style={styles.cardAddress} numberOfLines={1}>{address}</Text>
      </View>
      <View style={styles.cardIconsContainer}>
        {isHot && <Text style={styles.hotIcon}>Populer</Text>}
        {/* <TouchableOpacity onPress={onFavoritePress}>
          <Text style={styles.favoriteIcon}>❤️</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardTouchable: {
    borderRadius: 8,
    overflow: 'hidden',
  },
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
    fontFamily: InterBold,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLOR_PRIMARY,
    fontFamily: InterBold,
    marginVertical:5
  },
  cardAddress: {
    fontSize: 12,
    color: '#666',
    fontFamily: InterRegular,
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
