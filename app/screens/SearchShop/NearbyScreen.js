import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Text,
} from 'react-native';
import NearbyShopCard from '../../components/Cards/NearbyShopCard';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {endpoint} from '../../api/endpoint';
import {COLOR_PRIMARY} from '../../resources/colors';
import {
  fetchShopDataStart,
  fetchShopDataSuccess,
  fetchShopDataSuccessAll,
  fetchShopDataFailure,
} from '../../redux/slices/ShopSlice';
import {getDistance} from 'geolib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showToast} from '../../resources/helper';

const NearbyScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userToken, setUserToken] = useState();
  const [currentLocation, setCurrentLocation] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const shopDatas = useSelector(state => state.shop.shops);
  const [isAcceptLocation, setisAcceptLocation] = useState(false);

  useEffect(() => {
    getTokenData();
    requestLocationPermission();
  }, []);

  useEffect(() => {
    fetchShopData();
  }, [currentLocation]);

  const getTokenData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        setUserToken(value);
        console.log('Home Token', value);
      }
    } catch (e) {
      console.error(e);
    }
  };

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

  const fetchShopData = async () => {
    if (!currentLocation) {
      return;
    }
    setisLoading(true);
    try {
      const response = await axios.get(
        endpoint.getShop(currentLocation.latitude, currentLocation.longitude),
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      const shopsWithDistance = response.data.data.map(shop => ({
        ...shop,
        distance: calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          shop.lat,
          shop.lng,
        ),
      }));
      dispatch(fetchShopDataSuccess(shopsWithDistance));
    } catch (error) {
      dispatch(fetchShopDataFailure(error.message));
    } finally {
      setisLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
      console.log('Invalid coordinates');
      return 'Invalid coordinates';
    }
    const distance = getDistance(
      {latitude: lat1, longitude: lon1},
      {latitude: lat2, longitude: lon2},
    );
    return (distance / 1000).toFixed(2);
  };

  const renderItem = ({item}) => (
    <View style={{display: 'flex', alignItems: 'center'}}>
      <NearbyShopCard
        name={item.name}
        distance={item.distance}
        likes_count={item.likes_count}
        address={item.regency}
        image={item.thumbnail}
        onPress={() => navigation.navigate('DetailShop', {id: item.id})}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari toko sekitar"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
      ) : isAcceptLocation !== true  ? (
        <View style={styles.permissionDeniedContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            style={styles.warningIcon}
          />
          <Text style={styles.permissionDeniedText}>
            Akses lokasi ditolak 
          </Text>
        </View>
      ) : (
        <FlatList
          data={shopDatas}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    padding: 8,
  },
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
    textAlign:'center'
  },
  warningIcon: {
    color: COLOR_PRIMARY,
    fontSize: 24,
  },
});

export default NearbyScreen;
