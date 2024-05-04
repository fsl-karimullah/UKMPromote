import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity, // Import TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import {SelectList} from 'react-native-dropdown-select-list';
import axios from 'axios';
import {endpoint} from '../../api/endpoint';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {showToast} from '../../resources/helper';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
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
import {COLOR_PRIMARY} from '../../resources/colors';
import {InterBold} from '../../resources/fonts';
import EmptyComponent from '../../components/EmptyComponent/EmptyComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchShop = ({navigation}) => {
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
  const [searchValue, setsearchValue] = useState();
  const [filteredShopDatas, setFilteredShopDatas] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [loadingStorage, setLoadingStorage] = useState(false);
  const [userToken, setUserToken] = useState();


  useEffect(() => {
    getTokenData();
    fetchCategoryData();
    requestLocationPermission();
  }, []);

  useEffect(() => {
    fetchShopData();
  }, [currentLocation]);

  const getTokenData = async () => {
    setLoadingStorage(true); 
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        setUserToken(value);
        console.log('detail Token', value);
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
          showToast('error', 'Perhatian','Perijinan lokasi ditolak');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
        },
        error => console.log('Error getting location:', error),
      );
    } catch (error) {
      console.error('Error checking or requesting location permission:', error);
    }
  };

  const searchAction = async value => {
    if (!currentLocation) {
      return;
    }
    setisLoading(true);
    try {
      const response = await axios.get(
        endpoint.searchShop(
          value,
        ),
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      setFilteredShopDatas(response.data.data);
    } catch (error) {
      console.log('category error', error);
    } finally {
      setisLoading(false);
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
        endpoint.getShopAll(currentLocation.latitude, currentLocation.longitude),
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log(response);

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
      console.log(response);

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
      console.log(response.data.data);

      setcategoriesDatas(response.data.data);
      dispatch(fetchCategorySuccess(response.data.data));
    } catch (error) {
      dispatch(fetchCategoryFailure(error.message));
      console.log('category error', error);
    } finally {
      setisLoading(false);
    }
  };
  const renderItem = ({item}) => (
    <ShopCardVertical
      title={item.name}
      image={item.thumbnail}
      likes_count={item.likes_count}
      address={item.regency}
      onPress={() => navigation.navigate('DetailShop', {id: item.id})}
    />
  );

  const renderItemCategory = ({item}) => (
    <CategoryItem
      category={item}
      active={activeCategoryId === item.id}
      onPress={() => handleCategoryPress(item.id)}
    />
  );

  const handleCategoryPress = categoryId => {
    fetchShopDataByFilter(categoryId);
    setActiveCategoryId(categoryId);
  };

  const resetFilter = () => {
    setRefreshing(true);
    fetchShopData();
    setsearchValue(null);
    setRefreshing(false);
    setActiveCategoryId(null);
    searchAction(searchValue);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchShopData();
    setsearchValue(null);
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
          <Pressable
            onPress={() => searchAction(searchValue)}
            style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Cari</Text>
          </Pressable>
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
          data={filteredShopDatas.length > 0 ? filteredShopDatas : shopDatas}
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

      <TouchableOpacity style={styles.resetFilterButton} onPress={resetFilter}>
        <Text style={styles.resetFilterButtonText}>Reset Filter</Text>
        <Icon
          name="refresh"
          size={20}
          color="white"
          style={styles.resetFilterButtonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchBarContainer: {
    marginTop: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPercentageToDP(8),
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  searchButton: {
    marginRight: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLOR_PRIMARY,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: InterBold,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
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
  resetFilterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLOR_PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
  },
  resetFilterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: InterBold,
  },
  resetFilterButtonIcon: {
    marginLeft: 10,
    alignSelf:'center'
  },
});

export default SearchShop;
