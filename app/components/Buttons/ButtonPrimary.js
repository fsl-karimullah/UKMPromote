import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {COLOR_PRIMARY} from '../../resources/colors';
import {InterBold} from '../../resources/fonts';

const ButtonPrimary = ({title, onPress, isLoading}) => {
  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="small" color="white" />;
    } else {
      return <Text style={styles.buttonText}>{title}</Text>;
    }
  };

  return (
    <TouchableOpacity
      style={styles.loginButton}
      onPress={onPress}
      disabled={isLoading}>
      {renderContent()}
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: COLOR_PRIMARY,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: InterBold,
  },
});
