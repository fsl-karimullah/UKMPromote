import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import {InterBold, InterMedium, InterRegular} from '../../resources/fonts';
import {COLOR_PRIMARY, COLOR_RED_TRANSPARENT} from '../../resources/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ShopCardVertical = ({
  title,
  likes_count,
  image,
  isHot,
  address,
  onFavoritePress,
  onPress,
  customStyle,
  isLoading,
}) => {
  const imageHeight = heightPercentageToDP(15); 

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardTouchable, customStyle]}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLOR_PRIMARY} /> 
      ) : (
        <View style={styles.cardContainerVertical}>
          <Image source={{uri: image}} style={[styles.cardImageVertical, {height: imageHeight}]} />
          <View style={styles.cardTextContainerVertical}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.likesContainer}>
              {likes_count >= 0 && (
                <>
                  <FontAwesome name="heart" color={COLOR_PRIMARY} size={12} />
                  <Text style={styles.likesCount}>{likes_count}</Text>
                </>
              )}
            </View>
            <Text style={styles.cardAddress} numberOfLines={1}>
              {address}
            </Text>
          </View>
          <View style={styles.cardIconsContainer}>
            {isHot && <Text style={styles.hotIcon}>Populer</Text>}
            {/* <TouchableOpacity onPress={onFavoritePress}>
          <Text style={styles.favoriteIcon}>❤️</Text>
        </TouchableOpacity> */}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

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
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  likesCount: {
    fontSize: 12,
    color: COLOR_PRIMARY,
    marginLeft: 5,
    fontFamily: InterBold,
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
