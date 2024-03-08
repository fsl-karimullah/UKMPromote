import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TextInput } from 'react-native';
import NearbyShopCard from '../../components/Cards/NearbyShopCard';

const NearbyScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const nearbyShops = [
    {
      id: '1',
      name: 'Sample Shop 1',
      distance: '2.5',
      category: 'Grocery',
      address: '123 Street, City',
      image:
        'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    },
    {
      id: '2',
      name: 'Sample Shop 2',
      distance: '3.1',
      category: 'Clothing',
      address: '456 Avenue, Town',
      image:
        'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    },
    {
      id: '3',
      name: 'Sample Shop 3',
      distance: '3.1',
      category: 'Clothing',
      address: '456 Avenue, Town',
      image:
        'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    },
    {
      id: '4',
      name: 'Sample Shop 5',
      distance: '3.1',
      category: 'Clothing',
      address: '456 Avenue, Town',
      image:
        'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    },
  ];

  const filteredShops = nearbyShops.filter(
    shop =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || shop.category === selectedCategory)
  );

  const renderItem = ({ item }) => (
    <NearbyShopCard
      name={item.name}
      distance={item.distance}
      category={item.category}
      address={item.address}
      image={item.image}
      onPress={() => console.log(`Pressed on ${item.name}`)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search shops..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        {/* Add your category filter dropdown or buttons here */}
      </View>
      <FlatList
        data={filteredShops}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    padding: 8,
  },
});

export default NearbyScreen;
