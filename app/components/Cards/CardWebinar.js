import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { InterBold, InterRegular } from '../../resources/fonts';
import ButtonPrimary from '../Buttons/ButtonPrimary';

const CardWebinar = ({ webinar,onPress }) => {
 

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: webinar.thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{webinar.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {webinar.description}
        </Text>
        {/* <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Lihat Detail</Text>
        </TouchableOpacity> */}
        <ButtonPrimary title={'Lihat Detail'} onPress={onPress} />
      </View>
    </View>
  );
};

export default CardWebinar;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontFamily:InterBold
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontFamily:InterRegular
  },
  button: {
    backgroundColor: '#e53935',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
