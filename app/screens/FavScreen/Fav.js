// Fav.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FavCard from '../../components/Cards/FavCard';
import { InterBold } from '../../resources/fonts';
import { COLOR_BLACK } from '../../resources/colors';

const Fav = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Product 1',
      subtitle: 'Description for Product 1',
      imageSource: 'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg', 
    },
    {
      id: 2,
      title: 'Product 2',
      subtitle: 'Description for Product 2',
      imageSource: 'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg', 
    },
    {
      id: 3,
      title: 'Product 3',
      subtitle: 'Description for Product 3',
      imageSource: 'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg', 
    },
  ]);

  const renderFavItem = ({ item }) => (
    <FavCard
      key={item.id}
      title={item.title}
      subtitle={item.subtitle}
      imageSource={{ uri: item.imageSource }}
      onPress={() => console.log('test')}
    />
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Favorites</Text> */}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFavItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontFamily:InterBold,
    color:COLOR_BLACK
  },
});

export default Fav;
