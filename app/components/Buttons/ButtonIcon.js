import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLOR_PRIMARY} from '../../resources/colors';
import {InterBold} from '../../resources/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const ButtonIcon = ({title, onPress, iconName}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={onPress}>
        <Icon
          name={iconName}
          size={24}
          color="white"
          style={{marginRight: 15,alignSelf:'center'}}
        />
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: COLOR_PRIMARY,
    paddingVertical: 15,
    borderRadius: 8,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: InterBold,
  },
  container:{
    width:widthPercentageToDP(40),
  }
  
});
