import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../redux/slices/userSlices';
import ShopCardVertical from '../../components/Cards/ShopCardVertical';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {
  fetchShopDataStart,
  fetchShopDataSuccess,
  fetchShopDataFailure,
} from '../../redux/slices/ShopSlice';
import {endpoint} from '../../api/endpoint';

const Home = ({navigation}) => {
  const userData = useSelector(registerUser);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (status !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result !== RESULTS.GRANTED) {
          console.log('Location permission denied');
          showToast('warning', 'Perijinan lokasi ditolak');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
        },
        error => console.log('Error getting location:', error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const fetchShopData = async () => {
    if (!userData.payload?.user?.data?.data?.token || !currentLocation) {
      return;
    }
    setisLoading(true);
    dispatch(fetchShopDataStart());
    try {
      const response = await axios.get(
        endpoint.getShop(currentLocation.latitude, currentLocation.longitude),
        {
          headers: {
            Authorization: `Bearer ${userData.payload.user.data.data.token}`,
          },
        },
      );
      dispatch(fetchShopDataSuccess(response.data.data));
    } catch (error) {
      dispatch(fetchShopDataFailure(error.message));
    } finally {
      setisLoading(false);
    }
  };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  // useEffect(() => {
  //   fetchShopData();
  // }, [dispatch, userData, currentLocation]);
  useEffect(() => {
    requestLocationPermission();
    fetchShopData();
  }, []);

  const shopDatas = useSelector(state => state.shop.shops);
  // useEffect(() => {
  //   console.log('userrr', userData.payload.user.data.data.token);
  //   console.log('shop datas', shopDatas);
  // }, []);

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
      image:
        'https://images.bisnis.com/posts/2022/10/22/1590315/umkm_timur.jakarta.go.id.jpg',
      isPopular: true,
    },
    {
      id: '2',
      title: 'Shop 2',
      subtitle: 'Subtitle 2',
      image:
        'https://images.bisnis.com/posts/2022/10/22/1590315/umkm_timur.jakarta.go.id.jpg',
      isPopular: false,
    },
  ];

  const shopDataRekomendasi = [
    {
      title: 'Geprek AA Mastrip',
      subtitle: 'Toko ayam geprek',
      image:
        'https://cdn1.katadata.co.id/media/images/thumb/2021/08/24/Menyulap_Eceng_Gondok_Menjadi_Kerjainan_Tangan_Bernilai_Jual_Tinggi-2021_08_24-10_59_37_3e15c01c7cbe682623f5a38efc0b84bc_960x640_thumb.jpg',
      isHot: true,
      address: 'Jalan situbondo no 5 cindogo tapen bondowoso',
    },
    {
      title: 'Dapur Mama Ica',
      subtitle: 'Toko Kelontong',
      image:
        'https://gobiz.co.id/pusat-pengetahuan/wp-content/uploads/2021/07/Farhan-Abas-Unsplash-UMKM-usaha-kecil-usaha-mikro-2.jpg',
      isHot: false,
      address: 'Jalan situbondo no 10 cindogo tapen bondowoso',
    },
  ];

  const [numColumns, setNumColumns] = useState(2);
  const renderItemRekomendasi = ({item}) => (
    <ShopCardVertical customStyle={styles.RekomendasiCardStyle} {...item} />
  );

  const categoriesData = [
    {id: '1', name: 'Makanan'},
    {id: '2', name: 'Jasa'},
    {id: '3', name: 'Minuman'},
    {id: '4', name: 'Snack'},
    {id: '5', name: 'Aplikasi'},
    // Add more categories as needed
  ];
  const renderItem = ({item}) => (
    <CategoryItem
      category={item}
      onPress={() => console.log('category pressed')}
    />
  );

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await fetchShopData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.appBar}>
          <View style={styles.leftContainer}>
            <Image
              source={images.logoFirst}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.middleContainer}>
            <Text style={styles.locationText}>
              Welcome {userData.payload.user.data.data.name}
            </Text>
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
          <TitleWithArrow
            title={'Toko Populer'}
            onPressSeeAll={() => navigation.navigate('SearchShopScreen')}
          />
          <View>
            <FlatList
              data={shopDatas}
              horizontal
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <ShopCard
                  title={item.name}
                  subtitle={item.regency}
                  isLoading={isLoading}
                  image={item.thumbnail}
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
              data={shopDatas}
              horizontal
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <ShopCardLarge
                  title={item.name}
                  subtitle={item.regency}
                  image={item.thumbnail}
                  isPopular={item.isPopular}
                />
              )}
            />
          </View>
          <View>
            <TitleWithArrow
              title={'Rekomendasi'}
              onPressSeeAll={() => navigation.navigate('SearchShopScreen')}
            />
            <View>
              <FlatList
                data={shopDataRekomendasi}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemRekomendasi}
                numColumns={numColumns}
                columnWrapperStyle={styles.columnWrapper}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  columnWrapper: {
    justifyContent: 'space-between',
  },
  RekomendasiCardStyle: {},
});

export default Home;
