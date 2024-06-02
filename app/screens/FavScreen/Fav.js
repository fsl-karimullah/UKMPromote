import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FavCard from '../../components/Cards/FavCard';
import {InterBold} from '../../resources/fonts';
import {COLOR_BLACK, COLOR_PRIMARY} from '../../resources/colors';
import {endpoint} from '../../api/endpoint';
import axios from 'axios';
import {showToast} from '../../resources/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyComponentFirst from '../../components/EmptyComponent/EmptyComponentFirst'

const Fav = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserToken();
  }, []);

  const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        setUserToken(value);
        getFavoritesData(value);
      }
    } catch (error) {
      console.error('Error fetching user token:', error.message);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    if (userToken) {
      await getFavoritesData(userToken);
    }
    setRefreshing(false);
  };

  const getFavoritesData = async token => {
    try {
      setisLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${endpoint.getFavouriteShop}`, {
        headers: headers,
      });
      setFavorites(response.data.data);
    } catch (error) {
      console.error('Error fetching shop details:', error.message);
      showToast(
        'error',
        'Perhatian',
        'An error occurred while fetching shop details. Please try again.',
      );
    } finally {
      setisLoading(false);
    }
  };

  const renderFavItem = ({item}) => (
    <FavCard
      key={item.id}
      title={item.name}
      subtitle={item.regency}
      imageSource={{uri: item.thumbnail}}
      onPress={() => navigation.navigate('DetailShop', {id: item.shop_id})}
    />
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      ) : (
        <FlatList
          data={favorites}
          ListEmptyComponent={EmptyComponentFirst}
          keyExtractor={item => item.id.toString()}
          renderItem={renderFavItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontFamily: InterBold,
    color: COLOR_BLACK,
  },
});

export default Fav;
