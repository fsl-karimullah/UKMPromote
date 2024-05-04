import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconLeft from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Foundation';
import ShopSlider from '../../components/Slider/ShopSlider';
import {InterBold, InterMedium, InterRegular} from '../../resources/fonts';
import ButtonIcon from '../../components/Buttons/ButtonIcon';
import {COLOR_PRIMARY} from '../../resources/colors';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {endpoint} from '../../api/endpoint';
import axios from 'axios';
import {selectUserData} from '../../redux/selectors/userSelectors';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../resources/helper';
import {getShopDetailStart} from '../../redux/slices/ShopSlice';
import {addFavoriteShop} from '../../redux/slices/favoriteShopsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailShop = ({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shopDetails, setshopDetails] = useState(null);
  const [loadingStorage, setLoadingStorage] = useState(false);
  const userData = useSelector(selectUserData);
 
 
  useEffect(() => {
    getTokenData();
    fetchShopDetail();
  }, []); 


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

  const fetchShopDetail = async () => {   
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axios.get(`${endpoint.getShopDetail(id)}`, {
        headers: headers,
      });
      // console.log(response.data.data);
      setshopDetails(response.data.data);
      dispatch(getShopDetailStart(response.data.data));
    } catch (error) {
      console.error('Error fetching shop details:', error.message);
      showToast(
        'error',
        'Perhatian',
        'An error occurred while fetching shop details. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const addShopFav = async () => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        `${endpoint.favouriteShop()}`,
        {shop_id: id},
        {headers},
      );

      // console.log(response.data);

      const shopDetails = response.data.data;

      dispatch(addFavoriteShop(shopDetails));

      showToast('success', 'Sukses', 'Berhasil ditambahkan ke favorit.');
    } catch (error) {
      console.error('Error adding shop to favorites:', error.message);
      showToast(
        'error',
        'Perhatian',
        'Terdapat kesalahan, Toko sudah ditambahkan ke favorit.',
      );

      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const deleteShopFav = async () => {
    const shopId = shopDetails.favorite_id;
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.delete(
        `${endpoint.favouriteShop()}`,
        {shopId},
        {headers},
      );

      console.log(response.data);

      const shopDetails = response.data.data;

      showToast('success', 'Sukses', 'Berhasil dihapus dari favorit.');
    } catch (error) {
      console.error('Error remove shop from favorites:', error.message);
      showToast(
        'error',
        'Perhatian',
        'Terdapat kesalahan, Toko sudah ditambahkan ke favorit.',
      );

      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleInstagramPress = () => {
    if (shopDetails.instagram) {
      Linking.openURL(`https://www.instagram.com/${shopDetails.instagram}`);
    } else {
      showToast('error', 'Informasi', 'Bisnis ini tidak memiliki Instagram');
    }
  };

  const handleWebsitePress = () => {
    if (shopDetails.website) {
      let websiteURL = shopDetails.website.toLowerCase();
      if (
        !websiteURL.startsWith('http://') &&
        !websiteURL.startsWith('https://')
      ) {
        websiteURL = 'https://' + websiteURL;
      }
      Linking.openURL(websiteURL);
    } else {
      showToast('error', 'Informasi', 'Bisnis ini tidak memiliki website');
    }
  };

  const handleWhatsappPress = () => {
    if (shopDetails.whatsapp) {
      const whatsappNumber = shopDetails.whatsapp;
      const message = encodeURIComponent(
        `Halo ! Saya ${userData?.data?.name} ingin tau lebih banyak tentang toko anda.`,
      );
      const waMeLink = `https://wa.me/${whatsappNumber}?text=${message}`;
      Linking.openURL(waMeLink);
    } else {
      showToast(
        'error',
        'Informasi',
        'Bisnis ini tidak memiliki nomor WhatsApp',
      );
    }
  };
  const openMaps = () => {
    if (shopDetails.lat && shopDetails.lng) {
      const latitude = shopDetails.lat;
      const longitude = shopDetails.lng;
      const label = encodeURIComponent(shopDetails.name);
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      showToast(
        'error',
        'Informasi',
        'Tidak ada data koordinat untuk toko ini, silahkan kontak lewat whatsaap',
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <IconLeft name="caretleft" size={30} color={COLOR_PRIMARY} />
        </Pressable>
        <View style={styles.sliderContainer}>
          <ShopSlider
            images={shopDetails?.images}
            onClick={() => console.log('tes')}
          />
        </View>
        <View style={styles.tagContainer}>
          <Text style={[styles.tag, styles.popularTag]}>
            {shopDetails?.category}
          </Text>
          <View style={styles.iconContainer}>
            <Pressable onPress={() => openMaps()} style={styles.locationIcon}>
              <Ionicons name="location-sharp" size={24} color="white" />
            </Pressable>
            <Pressable
              style={styles.scheduleIcon}
              onPress={() => setShowModal(true)}>
              <MaterialIcons name="schedule" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.heartIcon}>
              <Ionicons name="heart" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <Modal
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
          style={styles.modal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropTransitionOutTiming={0}
          backdropOpacity={0.5}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Jadwal Buka Toko</Text>
            <View style={styles.dropdownContainer}>
              <View style={styles.openingHoursContainer}>
                {shopDetails?.schedule.map((item, index) => (
                  <View key={index} style={styles.hoursContainer}>
                    <Text style={styles.dayText}>{item.day}:</Text>
                    <Text style={styles.hoursText}>
                      {item.opening_hour} - {item.closing_hour}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.closeButtonContainer}>
              <Pressable
                style={styles.closeButton}
                onPress={() => setShowModal(false)}>
                <MaterialIcons name="close" size={30} color="#fff" />
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{shopDetails?.name}</Text>
          <Text style={styles.addressText}>
            {shopDetails?.province}, {shopDetails?.regency},{' '}
            {shopDetails?.district}
          </Text>

          {/* <Text style={styles.addressText}>Jalan Jember No. 54 Mastrip</Text> */}
          <View style={styles.socialContainer}>
            <Pressable style={styles.button} onPress={handleWebsitePress}>
              <Icon name="web" size={24} color="white" />
              <Text style={styles.buttonText}>Website</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleInstagramPress}>
              <Ionicons name="logo-instagram" size={24} color="white" />
              <Text style={styles.buttonText}>Instagram</Text>
            </Pressable>
          </View>

          <Text style={styles.description}>{shopDetails?.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonIcon
          onPress={handleWhatsappPress}
          iconName="whatsapp"
          title="Hubungi"
        />
        {shopDetails?.is_favorited ? (
          <ButtonIcon iconName="star" title="Hapus" onPress={deleteShopFav} />
        ) : (
          <ButtonIcon iconName="star" title="Favorit" onPress={addShopFav} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    padding: 10,
    borderRadius: 10,
  },
  sliderContainer: {
    marginTop: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  tag: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  popularTag: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
    fontFamily: InterBold,
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  locationIcon: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  scheduleIcon: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  heartIcon: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 50,
    padding: 10,
  },
  detailsContainer: {
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: InterBold,
    color: 'black',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    fontFamily: InterMedium,
    color: 'black',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: InterMedium,
    color: 'white',
    marginLeft: 10,
  },
  description: {
    fontSize: 12,
    fontFamily: InterMedium,
    color: 'black',
    lineHeight: 22,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333',
    fontFamily: InterBold,
  },

  dropdownContainer: {
    marginBottom: 20,
  },
  openingHoursContainer: {},
  hoursContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayText: {
    marginRight: 5,
    color: '#333',
    fontFamily: InterBold,
  },
  hoursText: {
    color: '#333',
    fontFamily: InterMedium,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 16,
    borderRadius: 30,
    backgroundColor: COLOR_PRIMARY,
    padding: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailShop;
