import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import { InterBold, InterMedium } from '../../resources/fonts';

const CardHorizontalButton = ({ title, subtitle, iconName, onPress, isHot = false }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {isHot && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotText}>HOT</Text>
            </View>
          )}
        </View>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: InterBold,
    color: 'black',
  },
  hotBadge: {
    backgroundColor: '#FF4D4F',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  hotText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: InterBold,
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
