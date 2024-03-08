import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
    fontSize: 16,
    fontFamily: InterBold,
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontFamily: InterMedium,
  },
});

export default EducationalCard;
