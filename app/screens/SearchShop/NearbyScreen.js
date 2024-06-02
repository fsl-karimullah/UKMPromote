import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import NearbyShopCard from '../../components/Cards/NearbyShopCard';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { endpoint } from '../../api/endpoint';
import { COLOR_PRIMARY } from '../../resources/colors';
import {
  fetchShopDataStart,
  fetchShopDataSuccess,
  fetchShopDataFailure,
} from '../../redux/slices/ShopSlice';
import { getDistance } from 'geolib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { showToast } from '../../resources/helper';
import EmptyComponent from '../../components/EmptyComponent/EmptyComponent';

const NearbyScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userToken, setUserToken] = useState();
  const [currentLocation, setCurrentLocation] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true); 
  const [refreshing, setRefreshing] = useState(false);
  const shopDatas = useSelector(state => state.shop.shops);
  const [filteredShops, setFilteredShops] = useState([]);
  const [isAcceptLocation, setisAcceptLocation] = useState(false);
  const [numColumn, setnumColumn] = useState(2);

  useEffect(() => {
    getTokenData();
    requestLocationPermission();
  }, []);

  useEffect(() => {
    fetchShopData(); 
  }, [currentLocation]);

  useEffect(() => {
    filterShops();
  }, [searchQuery, shopDatas]);

  const getTokenData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        setUserToken(value);
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
      getCurrentLocation();
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      error => console.log('Error getting location:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    setisAcceptLocation(true);
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

  const onRefresh = async () => {
    setRefreshing(true);
    await getCurrentLocation(); 
    await fetchShopData(); 
    setRefreshing(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
      console.log('Invalid coordinates');
      return 'Invalid coordinates';
    }
    const distance = getDistance(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 },
    );
    return (distance / 1000).toFixed(2);
  };

  const filterShops = () => {
    const filtered = shopDatas.filter(shop =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredShops(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <NearbyShopCard
        name={item.name}
        distance={item.distance}
        likes_count={item.likes_count}
        address={item.regency}
        image={item.thumbnail}
        onPress={() => navigation.navigate('DetailShop', { id: item.id })}
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
      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => getCurrentLocation()}
      >
        <Text style={styles.locationButtonText}>Klik disini jika anda ingin mengubah lokasi</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
      ) : isAcceptLocation !== true ? (
        <View style={styles.permissionDeniedContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            style={styles.warningIcon}
          />
          <Text style={styles.permissionDeniedText}>Akses lokasi ditolak</Text>
        </View>
      ) : (
        <FlatList
          data={filteredShops}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={EmptyComponent}
          numColumns={numColumn}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
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
  locationButton: {
    marginBottom: 16,
    backgroundColor: COLOR_PRIMARY,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    textAlign: 'center',
  },
  warningIcon: {
    color: COLOR_PRIMARY,
    fontSize: 24,
  },
});

export default NearbyScreen;
