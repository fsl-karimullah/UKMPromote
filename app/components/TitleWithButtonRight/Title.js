// TitleWithArrow.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {InterBold, InterMedium} from '../../resources/fonts';
import {COLOR_BLACK, COLOR_GRAY_SECONDARY, COLOR_GRAY_THIRD} from '../../resources/colors';

const TitleWithArrow = ({title, onPressSeeAll}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPressSeeAll}>
        <View style={styles.seeAllContainer}>
          <Text style={styles.seeAllText}>Lihat Semua</Text>
          <Icon name="keyboard-arrow-right" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: InterBold,
    color: COLOR_BLACK,
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: InterMedium,
    color: COLOR_GRAY_THIRD,
  },
});

export default TitleWithArrow;
