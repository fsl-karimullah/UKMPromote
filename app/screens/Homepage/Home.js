import React, {lazy, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
  Alert,
  BackHandler,
  Pressable,
  ActivityIndicator,
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
import {InterBold, InterMedium} from '../../resources/fonts';
import CategoryItem from '../../components/Cards/CategoryItem';
import TitleWithArrow from '../../components/TitleWithButtonRight/Title';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../redux/slices/userSlices';
import ShopCardVertical from '../../components/Cards/ShopCardVertical';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  fetchShopDataStart,
  fetchShopDataSuccess,
  fetchShopDataSuccessAll,
  fetchShopDataFailure,
} from '../../redux/slices/ShopSlice';
import {endpoint} from '../../api/endpoint';
import {selectUserData} from '../../redux/selectors/userSelectors';
import {selectCategoryData} from '../../redux/selectors/categorySelectors';
import {showToast} from '../../resources/helper';
import {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
} from '../../redux/slices/categorySlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import EducationalCard from '../../components/Cards/EducationalCards';
import SmallEducationalCard from '../../components/Cards/SmallEducationalCard';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const shopDatas = useSelector(state => state.shop.shops);
  const shopDatasAll = useSelector(state => state.shop.allShops);
  const userData = useSelector(selectUserData);
  const categoryData = useSelector(selectCategoryData);
  const [categoriesDatas, setcategoriesDatas] = useState();
  const [userToken, setUserToken] = useState(null);

  // useEffect(() => {
  //   const checkTokenValidity = async () => {
  //     try {
  //       const storedUserToken = await AsyncStorage.getItem('userToken');

  //       if (storedUserToken) {
  //         const isTokenValid = await yourCheckTokenValidityFunction(storedUserToken);

  //         if (isTokenValid) {
  //           setUserToken(storedUserToken);
  //         } else {
  //           navigation.replace('Login');
  //         }
  //       } else {
  //         navigation.replace('Login');
  //       }
  //     } catch (error) {
  //       console.error('Error checking token validity:', error);
  //     }
  //   };

  //   checkTokenValidity();
  // }, [navigation]);

  useEffect(() => {
    fetchShopData();
    fetchShopDataAll();
    // console.log('allshops',shopDatasAll);
  }, [currentLocation]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Perhatian', 'Apakah anda ingin keluar ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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
        // {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
      );
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const fetchShopData = async () => {
    if (!currentLocation) {
      return;
    }
    setisLoading(true);
    dispatch(fetchShopDataStart());
    try {
      const response = await axios.get(
        endpoint.getShop(currentLocation.latitude, currentLocation.longitude),
        {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
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

  const fetchShopDataAll = async () => {
    setisLoading(true);
    dispatch(fetchShopDataStart());
    try {
      const response = await axios.get(
        endpoint.getShopAll(
          currentLocation.latitude,
          currentLocation.longitude,
        ),
        {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        },
      );
      dispatch(fetchShopDataSuccessAll(response.data.data));
      console.log(response);
    } catch (error) {
      dispatch(fetchShopDataFailure(error.message));
    } finally {
      setisLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log('shop datas', shopDatas);
  // }, []);

  const bannerImages = [
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
  ];
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

  const [numColumns, setNumColumns] = useState(2);

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
          <View style={styles.middleContainer}>
            <Text style={styles.titleTextAppBar}>Selamat Datang</Text>
            <Text style={styles.locationText}>{userData.data.name}</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
            <Icon name="user-circle" size={30} color="white" />
          </Pressable>
        </View>

        <View>
          <BannerSlider
            images={bannerImages}
            onClick={() => console.log('tes')}
          />
        </View>

        <View style={styles.containerCard}>
          <TitleWithArrow
            title={'Bisnis Terbaru'}
            onPressSeeAll={() => navigation.navigate('SearchShopScreen')}
          />
          <View>
            {isLoading ? (
              <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
            ) : (
              <FlatList
                data={shopDatasAll}
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
                    onPress={() =>
                      navigation.navigate('DetailShop', {id: item.id})
                    }
                  />
                )}
              />
            )}
          </View>
        </View>
        <View style={styles.containerCard}>
          <TitleWithArrow
            title={'Toko Sekitar'}
            onPressSeeAll={() => navigation.navigate('NearbyScreen')}
          />
          {isLoading ? (
            <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
          ) : (
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
                    anotherData={item.likes_count}
                    image={item.thumbnail}
                    isPopular={item.isPopular}
                    onPress={() =>
                      navigation.navigate('DetailShop', {id: item.id})
                    }
                  />
                )}
              />
            </View>
          )}
        </View>
        <View style={styles.containerCard}>
          <TitleWithArrow
            title={'Artikel & Edukasi'}
            onPressSeeAll={() => navigation.navigate('EducationalScreen')}
          />
          <View>
            <FlatList
              data={educationalVideos}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <SmallEducationalCard
                  title={item.title}
                  description={item.description}
                  imageSource={item.imageSource}
                  onPress={() => item.onPress(navigation)}
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
    alignItems: 'flex-start',
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
    fontSize: 20,
    fontFamily: InterBold,
  },
  titleTextAppBar: {
    color: 'white',
    fontSize: 16,
    fontFamily: InterMedium,
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
