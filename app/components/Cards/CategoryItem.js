// CategoryItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { COLOR_BLACK, COLOR_PRIMARY } from '../../resources/colors';
import { InterBold, InterMedium } from '../../resources/fonts';

const CategoryItem = ({ category, active, onPress }) => {
  const backgroundColor = active ? 'COLOR_PRIMARY' : 'white';
  const textDecoration = active ? 'underline' : 'none'; 
  const textColor = active ? COLOR_PRIMARY : COLOR_BLACK; 

  return (
    <TouchableOpacity
      style={[styles.categoryItem]}
      onPress={() => onPress(category.id)}
    >
      <Text style={[styles.textCategory,{color:textColor, textDecorationLine: textDecoration }]}>{category.name}</Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  categoryItem: {
    marginRight: 30,
    alignItems: 'center',
  },
  textCategory:{
    fontFamily:InterBold,
    fontSize:15
  }
});

export default CategoryItem;
