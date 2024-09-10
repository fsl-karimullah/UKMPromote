import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { InterBold, InterMedium, InterRegular } from '../../resources/fonts';
import { COLOR_PRIMARY } from '../../resources/colors';

const CardMentors = ({ mentor }) => {
  const handlePress = () => {
    const message = `Hello, I'm interested in booking a session with ${mentor.name}.`;
    const phoneNumber = '+6285281252199';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    Linking.openURL(url).catch((err) => console.error('Error opening WhatsApp:', err));
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: mentor.thumbnail }} style={styles.photo} />
      <View style={styles.info}>
        <Text style={styles.name}>{mentor.name}</Text>
        <Text style={styles.position}>{mentor.position}</Text>
        <Text style={styles.availability}>
          Available: {mentor.day_start_available} - {mentor.day_end_available}
        </Text>
        <Text style={styles.hours}>
          Jam: {mentor.opening_hour} - {mentor.closing_hour}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardMentors;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 10,
    alignItems: 'center',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: InterBold,
    color: 'black',
  },
  position: {
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
    fontFamily: InterMedium,
  },
  availability: {
    fontSize: 12,
    color: 'black',
    fontFamily: InterRegular,
  },
  hours: {
    fontSize: 12,
    color: 'black',
    fontFamily: InterRegular,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: InterBold,
  },
});
