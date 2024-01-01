// SearchShop.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';

const ShopCardVertical = ({ title, subtitle, image, isHot, address }) => (
  <View style={styles.cardContainer}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      {isHot && <Text style={styles.hotIcon}>Hot</Text>}
      <Text style={styles.cardAddress}>{address}</Text>
    </View>
  </View>
);

const SearchShop = () => {
  // Dummy data for vertically scrolling cards
  const shopData = [
    {
      title: 'Shop 1',
      subtitle: 'Lorem ipsum dolor',
      image: 'https://placekitten.com/200/200',
      isHot: true,
      address: 'Jalan situbondo no 5 cindogo tapen bondowoso',
    },
    // Add more shop data as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search shops..."
          // Add search functionality as needed
        />
      </View>

      <ScrollView>
        {shopData.map((shop, index) => (
          <ShopCardVertical key={index} {...shop} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  cardTextContainer: {
    flex: 1,
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  hotIcon: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardAddress: {
    fontSize: 12,
    color: '#888',
  },
});

export default SearchShop;
