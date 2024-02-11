import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLOR_GRAY_SECONDARY} from '../../resources/colors';
import {InterBold} from '../../resources/fonts';

const ButtonGray = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.createAccountButton} onPress={onPress}>
      <Text style={styles.buttonTextRegister}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonGray;

const styles = StyleSheet.create({
  createAccountButton: {
    backgroundColor: COLOR_GRAY_SECONDARY,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTextRegister: {
    color: 'black',
    fontSize: 18,
    fontFamily: InterBold,
  },
});
