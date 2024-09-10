import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { showToast } from '../../resources/helper';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
} from '../../redux/slices/categorySlice';
import {
  fetchShopDataStart,
  fetchShopDataSuccess,
  fetchShopDataFailure,
} from '../../redux/slices/ShopSlice';
import ShopCardVertical from '../../components/Cards/ShopCardVertical';
import CategoryItem from '../../components/Cards/CategoryItem';
import { COLOR_PRIMARY } from '../../resources/colors';
import { InterBold } from '../../resources/fonts';
import EmptyComponent from '../../components/EmptyComponent/EmptyComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoint } from '../../api/endpoint';

const SearchShop = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const userData = useSelector(state => state.user);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selected, setSelected] = useState('');
  const [showModal, setShowModal] = useState(false);
  const shopDatas = useSelector(state => state.shop.shops);
  const [numColumns, setnumColumns] = useState(2);
  const [categoriesDatas, setcategoriesDatas] = useState();
  const [searchValue, setsearchValue] = useState('');
  const [filteredShopDatas, setFilteredShopDatas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [loadingStorage, setLoadingStorage] = useState(false);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    getTokenData();
    requestLocationPermission();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchShopData();
      fetchCategoryData();
    }, [currentLocation])
  );

  useEffect(() => {
    filterShops(searchValue);
  }, [searchValue, shopDatas]);

  const getTokenData = async () => {
    setLoadingStorage(true);
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        setUserToken(value);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStorage(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (status !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result !== RESULTS.GRANTED) {
          showToast('error', 'Perhatian', 'Perijinan lokasi ditolak');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        }, 
        error => console.log('Error getting location:', error),
      );
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const filterShops = value => {
    const filtered = shopDatas.filter(
      shop =>
        shop.name.toLowerCase().includes(value.toLowerCase()) ||
        shop.regency.toLowerCase().includes(value.toLowerCase())
    );

    if (filtered.length === 0) {
      setFilteredShopDatas(null);
    } else {
      setFilteredShopDatas(filtered);
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
        endpoint.getShopAll(
          currentLocation.latitude,
          currentLocation.longitude,
        ),
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
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

  const fetchShopDataByFilter = async categoryId => {
    if (!currentLocation) {
      return;
    }
    setisLoading(true);
    dispatch(fetchShopDataStart());
    try {
      const response = await axios.get(
        endpoint.getShopByFilter(
          currentLocation.latitude,
          currentLocation.longitude,
          categoryId,
        ),
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
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
      const response = await axios.get(endpoint.getCategories, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const allCategories = [{ id: 'all', name: 'Semua' }, ...response.data.data];

      setcategoriesDatas(allCategories);
      dispatch(fetchCategorySuccess(allCategories));
    } catch (error) {
      dispatch(fetchCategoryFailure(error.message));
    } finally {
      setisLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <ShopCardVertical
      title={item.name}
      image={item.thumbnail}
      likes_count={item.likes_count}
      address={item.regency}
      onPress={() => navigation.navigate('DetailShop', { id: item.id })}
    />
  );

  const renderItemCategory = ({ item }) => (
    <CategoryItem
      category={item}
      active={activeCategoryId === item.id}
      onPress={() => handleCategoryPress(item.id)}
    />
  );

  const handleCategoryPress = categoryId => {
    if (categoryId === 'all') {
      fetchShopData();
    } else {
      fetchShopDataByFilter(categoryId);
    }
    setActiveCategoryId(categoryId);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchShopData();
    setsearchValue('');
    setRefreshing(false);
    setActiveCategoryId(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk dan jasa yang anda inginkan"
            placeholderTextColor="#A0A0A0"
            value={searchValue}
            onChangeText={text => setsearchValue(text)}
          />
          {searchValue.length > 0 && (
            <TouchableOpacity
              onPress={() => setsearchValue('')}
              style={styles.clearButton}>
              <Icon name="close" size={20} color="#A0A0A0" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.containerCategory}>
          <FlatList
            horizontal
            data={categoriesDatas}
            renderItem={renderItemCategory}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLOR_PRIMARY} />
      ) : (
        <FlatList
          ListEmptyComponent={EmptyComponent}
          data={filteredShopDatas === null ? [] : filteredShopDatas.length > 0 ? filteredShopDatas : shopDatas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={numColumns}
          columnWrapperStyle={styles.columnWrapper}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Kategori</Text>
          <View style={styles.dropdownContainer}>
            {/* <Text>test</Text> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  searchBarContainer: {
    marginTop: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  filterText: {
    marginRight: 5,
    color: '#333',
  },
  modal: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdownContainer: {
    width: widthPercentageToDP(80),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  containerCategory: {
    marginVertical: 10,
  },
});

export default SearchShop;
