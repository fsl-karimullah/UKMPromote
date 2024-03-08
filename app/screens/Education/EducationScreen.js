import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import EducationalCard from '../../components/Cards/EducationalCards';

const EducationScreen = () => {
  const educationalVideos = [
    {
      id: '1',
      title: 'Introduction to React Native',
      description: 'Learn the basics of React Native development.',
      imageSource: 'https://example.com/video1.jpg',
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      description: 'Deep dive into advanced JavaScript topics.',
      imageSource: 'https://example.com/video2.jpg',
    },
    // Add more educational video data as needed
  ];

  const renderItem = ({ item }) => (
    <EducationalCard
      title={item.title}
      description={item.description}
      imageSource={item.imageSource}
      onPress={() => console.log(`Pressed on ${item.title}`)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={educationalVideos}
        keyExtractor={(item) => item.id}
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
});

export default EducationScreen;
