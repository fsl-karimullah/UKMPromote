import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import EducationalCard from '../../components/Cards/EducationalCards';

const EducationScreen = ({navigation}) => {
  const educationalVideos = [
    {
      id: '1',
      title: 'Cara upload bisnis ke Brand-In ke Brand-in',
      description:
        'Mempelajari cara menggunakan admin page di brand-in untuk mengupload bisnis.',
      imageSource: 'https://i.ytimg.com/vi/25RD3_TE33s/maxresdefault.jpg',
      onPress: navigation =>
        navigation.navigate('EducationalDetail', {
          title: 'Belajar Basic Upload UMKM ke Brand-in',
          description:
            'Mempelajari cara menggunakan admin page di brand-in untuk mengupload bisnis',
          youtubeVideoId: '25RD3_TE33s',
          datePosted: Date.now(),
        }),
    },
    {
      id: '2',
      title: 'GOODPRENEURS - CARA MARKETING BUDGET TIPIS HASIL MILYARAN !!! (GUERILLA METHOD) | BRADERKAY',
      description: 'GUERILLA MARKETING Adalah teknik marketing abnormal yang memiliki target market khusus, spesifik dengan goal viral ataupun sensasional dan harus mampu mencuri perhatian. simak full penjelasannya dari Braderkay di video ini..',
      imageSource: 'https://i.ytimg.com/vi/1k21C-UR_8s/maxresdefault.jpg',
      onPress: navigation =>
        navigation.navigate('EducationalDetail', {
          title: 'Belajar Basic Upload UMKM ke Brand-in',
          description:
            'Mempelajari cara menggunakan admin page di brand-in untuk mengupload bisnis',
          youtubeVideoId: '1k21C-UR_8s',
          datePosted: Date.now(),
        }),
    },
  ];

  const renderItem = ({ item }) => (
    <EducationalCard
      title={item.title}
      description={item.description}
      imageSource={item.imageSource}
      onPress={() => item.onPress(navigation)}
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
