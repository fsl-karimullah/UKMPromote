import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_BLACK } from '../../resources/colors';

const EducationClassCards = ({ title, desc, imageSource, onPress, isFree }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { transform: [{ scale: pressed ? 0.95 : 1 }] },
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
      <View style={isFree ? styles.tagContainer : styles.tagPremium}>
        <Text style={styles.tag}>{isFree}</Text>
      </View>
      <Animated.View
        style={[
          styles.starIconContainer,
          { transform: [{ scale: scaleValue }] },
        ]}
      >
        <Icon name="book-education" size={24} color={'#007bff'} style={styles.starIcon} />
      </Animated.View>
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
    fontFamily: InterBold,
    color: COLOR_BLACK,
  },
  cardDesc: {
    fontSize: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontFamily: InterMedium,
    color: COLOR_BLACK,
  },
  tagContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#007bff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  tagPremium: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#DAA520',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  tag: {
    fontSize: 12,
    color: '#fff',
  },
  starIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  starIcon: {},
});

export default EducationClassCards;
