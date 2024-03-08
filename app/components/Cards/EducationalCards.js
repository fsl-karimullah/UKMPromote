// EducationalCard.js

import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { InterBold, InterMedium } from '../../resources/fonts';

const EducationalCard = ({ title, description, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: InterBold,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontFamily: InterMedium,
  },
});

export default EducationalCard;
