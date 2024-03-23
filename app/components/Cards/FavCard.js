import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_BLACK } from '../../resources/colors';

const FavCard = ({ title, subtitle, imageSource,onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <Icon name="feed-star" size={24} color="gold" style={styles.starIcon} />
    </Pressable>
  ); 
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden', 
    margin: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardImage: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    marginVertical: 8,
    paddingHorizontal: 16,
    fontFamily:InterBold,
    color:COLOR_BLACK
  },
  cardSubtitle: {
    fontSize: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontFamily:InterMedium,
    color:COLOR_BLACK
  },
  starIcon: {
    alignSelf: 'flex-end',
    margin: 8,
  },
});

export default FavCard;
