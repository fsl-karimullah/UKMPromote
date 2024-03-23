import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import EducationClassCards from '../../components/Cards/EducationClassCards';
import images from '../../resources/images';

const BusinessClass = ({navigation}) => {
  // Sample data for demonstration
  const data = [
    {
      id: '1',
      title: 'Business Class 1',
      desc: 'Ad id duis quis magna cupidatat esse minim quis aliqua.',
      imageSource: images.BannerExample,
    },
    {
      id: '2',
      title: 'Business Class 2',
      desc: 'Ad id duis quis magna cupidatat esse minim quis aliqua.',
      imageSource: images.BannerExample,
    },
    // Add more data as needed
  ];

  const renderItem = ({ item }) => (
    <EducationClassCards
      title={item.title}
      desc={item.desc}
      imageSource={item.imageSource}
      onPress={() => navigation.navigate('BussinessDetailScreen')} 
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default BusinessClass;
