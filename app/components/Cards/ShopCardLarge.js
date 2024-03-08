import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


const ShopCard = ({ title, subtitle, image, isPopular, anotherData, onPress }) => {
  const hasLongAddress = subtitle.length > 30;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { borderBottomLeftRadius: hasLongAddress ? 8 : 8, borderBottomRightRadius: hasLongAddress ? 8 : 8 }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.contentContainer}>
        {isPopular && (
          <View style={styles.popularContainer}>
            <Icon name="fire" size={30} color={COLOR_PRIMARY} />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.likesContainer}>
          <FontAwesome5Icon name="heart" size={14} color={COLOR_PRIMARY} style={styles.heartIcon} />
          <Text style={styles.likesCount}>{anotherData}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginRight: 4,
  },
  likesCount: {
    fontSize: 14,
    color: COLOR_PRIMARY,
    fontFamily: InterMedium,
  },
  container: {
    width: widthPercentageToDP(60),
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2, 
  },
  image: {
    width: '100%',
    height: heightPercentageToDP(20),
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 4,
  },
});

export default ShopCard;
