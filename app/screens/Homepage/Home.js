import React from 'react';
import {StyleSheet, Text, View, Image, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import images from '../../resources/images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import BannerSlider from '../../components/Slider/BannerSlider';
import ShopCard from '../../components/Cards/ShopCard';
import ShopCardLarge from '../../components/Cards/ShopCardLarge';
import {COLOR_PRIMARY} from '../../resources/colors';
import {InterBold} from '../../resources/fonts';
import CategoryItem from '../../components/Cards/CategoryItem';
import TitleWithArrow from '../../components/TitleWithButtonRight/Title';

const Home = ({navigation}) => {
  const bannerImages = [
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
  ];

  const shopData = [
    {
      id: '1',
      title: 'Geprek AA Mastrip',
      subtitle: 'Jalan Mastrip no. 5 cindogo jember bondowoso',
      image: 'https://images.bisnis.com/posts/2022/10/22/1590315/umkm_timur.jakarta.go.id.jpg',
      isPopular: true,
    },
    {
      id: '2',
      title: 'Shop 2',
      subtitle: 'Subtitle 2',
      image: 'https://images.bisnis.com/posts/2022/10/22/1590315/umkm_timur.jakarta.go.id.jpg',
      isPopular: false,
    },
    {
      id: '3',
      title: 'Shop 3',
      subtitle: 'Subtitle 3',
      image: 'https://images.bisnis.com/posts/2022/10/22/1590315/umkm_timur.jakarta.go.id.jpg',
      isPopular: true,
    },
  ];

  const categoriesData = [
    {id: '1', name: 'Makanan'},
    {id: '2', name: 'Jasa'},
    {id: '3', name: 'Minuman'},
    {id: '4', name: 'Snack'},
    {id: '5', name: 'Aplikasi'}, 
    // Add more categories as needed
  ];
  const renderItem = ({ item }) => <CategoryItem category={item} onPress={() => console.log('category pressed')} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginBottom:heightPercentageToDP(10)}}>
      <View style={styles.appBar}>
        <View style={styles.leftContainer}>
          <Image
            source={images.logoFirst}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.middleContainer}>
          <Text style={styles.locationText}>Jember, Sumbersari</Text>
        </View>

        <View style={styles.rightContainer}>
          <Image
            source={images.logoFirst}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      <View>
        <BannerSlider
          images={bannerImages}
          onClick={() => console.log('tes')}
        />
      </View>
      <View style={styles.containerCard}>
        <FlatList
          horizontal
          data={categoriesData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.containerCard}>
        <TitleWithArrow title={'Toko Populer'} onPressSeeAll={() => navigation.navigate('SearchShopScreen')} />
        <View>
          <FlatList
            data={shopData}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <ShopCard
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                isPopular={item.isPopular}
                onPress={() => navigation.navigate('DetailShop')}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.containerCard}>
        <TitleWithArrow title={'Toko Baru'} />
        <View>
          <FlatList
            data={shopData}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <ShopCardLarge
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                isPopular={item.isPopular}
              />
            )}
          />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingBottom:heightPercentageToDP(2)
  },

  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: heightPercentageToDP(10),
    backgroundColor: COLOR_PRIMARY,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  middleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  logo: {
    width: 40,
    height: 40,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
 
  containerCard: {
    margin: 10,
  },
});

export default Home;
