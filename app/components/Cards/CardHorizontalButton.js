import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { InterBold, InterMedium } from '../../resources/fonts';

const CardHorizontalButton = ({ title, subtitle, iconName, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View> 
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} color="#000" /> 
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: InterBold,
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: InterMedium,
    color: '#666',
    marginTop: 4,
  },
  iconContainer: {
    marginRight: 16,
  },
});

export default CardHorizontalButton;
