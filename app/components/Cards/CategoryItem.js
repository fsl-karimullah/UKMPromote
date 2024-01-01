// CategoryItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { COLOR_BLACK } from '../../resources/colors';
import { InterMedium } from '../../resources/fonts';

const CategoryItem = ({ category, active, onPress }) => {
  const backgroundColor = active ? 'COLOR_PRIMARY' : 'transparent';

  return (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor }]}
      onPress={() => onPress(category.id)}
    >
      <Text style={styles.textCategory}>{category.name}</Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  categoryItem: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(5),
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textCategory:{
    color:COLOR_BLACK,
    fontFamily:InterMedium
  }
});

export default CategoryItem;
