import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const FundingCard = ({ investorImage, investorProfile, investorPosition,onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: investorImage }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.profile} numberOfLines={1}>{investorProfile}</Text>
        <Text style={styles.position}>{investorPosition}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  profile: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  position: {
    fontSize: 14,
    color: '#666',
  },
});

export default FundingCard;
