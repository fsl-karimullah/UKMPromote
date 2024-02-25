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
import {InterBold, InterMedium} from '../../resources/fonts';
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
import {selectUserData} from '../../redux/selectors/userSelectors';
import {selectCategoryData} from '../../redux/selectors/categorySelectors'
import {showToast} from '../../resources/helper';
import { fetchCategoryStart, fetchCategorySuccess, fetchCategoryFailure } from '../../redux/slices/categorySlice'; 

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const shopDatas = useSelector(state => state.shop.shops);
  const userData = useSelector(selectUserData);
  const categoryData = useSelector(selectCategoryData); 
const [categoriesDatas, setcategoriesDatas] = useState() 

  useEffect(() => {
    fetchShopData();
  }, [currentLocation]);

  useEffect(() => {
    // console.log('Category from redux',categoryData);
    requestLocationPermission();
    fetchCategoryData()
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
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
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

  const fetchCategoryData = async () => {
    dispatch(fetchCategoryStart()); 
    try {
      const response = await axios.get(
        endpoint.getCategories,
        {
          headers: {
            Authorization: `Bearer ${userData.data.token}`,
          },
        },
      );
      // console.log(response.data.data);
      setcategoriesDatas(response.data.data)
      dispatch(fetchCategorySuccess(response.data.data)); 
    } catch (error) {
      dispatch(fetchCategoryFailure(error.message)); 
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
          <Text style={styles.titleTextAppBar}>
              Selamat Datang
            </Text>
            <Text style={styles.locationText}>
              {userData.data.name}
            </Text>
          </View>
          <Text>asdas</Text>
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
            data={categoriesDatas}
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
                  onPress={() =>
                    navigation.navigate('DetailShop', {id: item.id})
                  }
                />
              )}
            />
          </View>
        </View>
        <View style={styles.containerCard}>
          <TitleWithArrow title={'Toko Sekitar'} />
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
    fontFamily:InterBold
  },
  titleTextAppBar: {
    color: 'white',
    fontSize: 16,
    fontFamily:InterMedium
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
