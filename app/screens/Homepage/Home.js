import React, {lazy, useEffect, useMemo, useState} from 'react';
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
import {
  fetchNewsStart,
  fetchNewsFailure,
  fetchNewsSuccess,
  fetchAllNewsSuccess,
} from '../../redux/slices/newsSlices';
import {endpoint} from '../../api/endpoint';
import {fetchUserDataFromStorage} from '../../redux/slices/storageSlice';
import {selectUserData} from '../../redux/selectors/userSelectors';
import {selectCategoryData} from '../../redux/selectors/categorySelectors';
import {showToast} from '../../resources/helper';
import {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
} from '../../redux/slices/categorySlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/MaterialIcons';
import EducationalCard from '../../components/Cards/EducationalCards';
import SmallEducationalCard from '../../components/Cards/SmallEducationalCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EmptyComponent from '../../components/EmptyComponent/EmptyComponent';
import EmptyNearbyScreen from '../../components/EmptyComponent/EmptyNearbyScreen';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const shopDatas = useSelector(state => state.shop.shops);
  const shopDatasAll = useSelector(state => state.shop.allShops);
  const newsData = useSelector(state => state.news);
  const userData = useSelector(selectUserData);
  const [userToken, setUserToken] = useState();
  const [isAcceptLocation, setisAcceptLocation] = useState(false);
  const [NewsData, setNewsData] = useState([]);

  const menuData = [
    {
      id: '1',
      title: 'Kelas Bisnis',
      icon: 'user-graduate',
      route: 'OnlineCourseScreen',
    },
 
  ];

  const getTokenData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        setUserToken(value);
      }
    } catch (error) {
      console.error('Error getting user token:', error);
    }
  };

  useEffect(() => {
    fetchShopData();
    fetchShopDataAll();
  }, [currentLocation]);
  useEffect(() => {
    // console.log(userData);
    getTokenData();
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchNewsData();
    }
  }, [userToken]);

  const requestLocationPermission = async () => {
    try {
      const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (status !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result !== RESULTS.GRANTED) {
          console.log('Location permission denied');
          showToast('error', 'Perhatian', 'Perijinan lokasi ditolak');
          setisAcceptLocation(false);
          return;
        }
      }
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
        },
        error => console.log('Error getting location:', error),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
      );
      setisAcceptLocation(true);
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const calculateDistance = useMemo(
    () => (lat1, lon1, lat2, lon2) => {
      if (
        !lat1 ||
        !lon1 ||
        !lat2 ||
        !lon2 ||
        lat1 === '0.00000000' ||
        lon1 === '0.00000000' ||
        lat2 === '0.00000000' ||
        lon2 === '0.00000000'
      ) {
        console.log('Invalid coordinates');
        return null;
      }

      const toRadians = degrees => (degrees * Math.PI) / 180;

      const R = 6371;
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance.toFixed(2);
    },
    [currentLocation],
  );

  const fetchShopData = async () => {
    if (!currentLocation) {
      return;
    }
    setisLoading(true);
    try {
      console.log('Fetching shop data...');
      const startTime = Date.now();
      const response = await axios.get(
        endpoint.getShop(currentLocation.latitude, currentLocation.longitude),
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      const endTime = Date.now();
      console.log(`API call duration: ${endTime - startTime}ms`);
      const shopsWithDistance = response.data.data
        .map(shop => ({
          ...shop,
          distance: calculateDistance(
            parseFloat(currentLocation.latitude),
            parseFloat(currentLocation.longitude),
            parseFloat(shop.lat),
            parseFloat(shop.lng),
          ),
        }))
        .filter(
          shop => shop.distance !== null && parseFloat(shop.distance) <= 5,
        );
      dispatch(fetchShopDataSuccess(shopsWithDistance));
    } catch (error) {
      dispatch(fetchShopDataFailure(error.message));
    } finally {
      setisLoading(false);
    }
  };

  const fetchNewsData = async () => {
    setisLoading(true);
    dispatch(fetchNewsStart());
    try {
      const response = await axios.get(endpoint.getNews, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      // console.log('NEWSSS', response.data.data);
      setNewsData(response.data.data);
      dispatch(fetchNewsSuccess(response.data.data));
    } catch (error) {
      dispatch(fetchNewsFailure(error.message));
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const fetchShopDataAll = async () => {
    setisLoading(true);
    dispatch(fetchShopDataStart());
    try {
      const response = await axios.get(endpoint.getShopAll(), {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      dispatch(fetchShopDataSuccessAll(response.data.data));
    } catch (error) {
      dispatch(fetchShopDataFailure(error.message));
    } finally {
      setisLoading(false);
    }
  };

  const bannerImages = [
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
  ];

  const [numColumns, setNumColumns] = useState(2);

  const renderItem = ({item}) => (
    <CategoryItem
      category={item}
      onPress={() => console.log('category pressed')}
    />
  );
  const onSelectMenu = route => {
    navigation.navigate(route);
  };
  const renderItemMenu = ({item}) => (
    <Pressable onPress={() => onSelectMenu(item.route)} style={styles.menuItem}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name={item.icon} size={24} color={'white'} />
      </View>
      <Text style={styles.menuText}>{item.title}</Text>
    </Pressable>
  );

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await fetchShopData();
      await fetchNewsData();
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
            <Text style={styles.locationText}>{userData.data?.name}</Text>
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

        {/* <View style={styles.containerMenu}>
          <FlatList
            data={menuData}
            renderItem={renderItemMenu}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>  */}

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
                initialNumToRender={5}
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
          ) : isAcceptLocation !== true ? (
            <View style={styles.permissionDeniedContainer}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                style={styles.warningIcon}
              />
              <Text style={styles.permissionDeniedText}>
                Perijinan lokasi ditolak
              </Text>
            </View>
          ) : (
            <View style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
              <FlatList
                data={shopDatas}
                horizontal
                ListEmptyComponent={EmptyNearbyScreen}
                initialNumToRender={5}
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
            title={'Artikel & Blog'}
            onPressSeeAll={() => navigation.navigate('ListAllNews')}
          />
          <View>
            {isLoading ? (
              <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
            ) : (
              <FlatList
                data={NewsData}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <SmallEducationalCard
                    title={item.title}
                    description={item.description}
                    imageSource={item.thumbnail}
                    onPress={() =>
                      navigation.navigate('NewsDetails', {id: item.id})
                    }
                  />
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  permissionDeniedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  permissionDeniedText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR_PRIMARY,
  },
  warningIcon: {
    color: COLOR_PRIMARY,
    fontSize: 24,
  },
  container: {
    flex: 1,
    // paddingBottom:heightPercentageToDP(2)
    backgroundColor: 'white',
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
  containerMenu: {
    paddingVertical: 20,
  },
  listContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  menuText: {
    marginTop: 10,
    color: COLOR_PRIMARY,
    fontFamily: InterBold,
  },
});

export default Home;
