import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {selectUserData} from '../../redux/selectors/userSelectors';
import axios from 'axios';
import {showToast} from '../../resources/helper';

const Fav = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [isLoading, setisLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const getFavoritesData = async () => {
    try {
      setisLoading(true);
      const headers = {
        Authorization: `Bearer ${userData?.data?.token}`,
      };
      const response = await axios.get(`${endpoint.getFavouriteShop}`, {
        headers: headers,
      });
      console.log(response.data.data);
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

  useEffect(() => {
    // console.log(userData.data.token);
    getFavoritesData();
  }, []);

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
      {/* <Text style={styles.heading}>Favorites</Text> */}
      {isLoading ? (
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={renderFavItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontFamily: InterBold,
    color: COLOR_BLACK,
  },
});

export default Fav;
