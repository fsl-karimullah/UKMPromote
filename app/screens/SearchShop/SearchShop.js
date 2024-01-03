import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import ShopCardVertical from '../../components/Cards/ShopCardVertical';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const SearchShop = () => {
  const shopData = [
    {
      title: 'Geprek AA Mastrip',
      subtitle: 'Toko ayam geprek',
      image: 'https://cdn1.katadata.co.id/media/images/thumb/2021/08/24/Menyulap_Eceng_Gondok_Menjadi_Kerjainan_Tangan_Bernilai_Jual_Tinggi-2021_08_24-10_59_37_3e15c01c7cbe682623f5a38efc0b84bc_960x640_thumb.jpg',
      isHot: true,
      address: 'Jalan situbondo no 5 cindogo tapen bondowoso',
    },
    {
      title: 'Dapur Mama Ica',
      subtitle: 'Toko Kelontong',
      image: 'https://gobiz.co.id/pusat-pengetahuan/wp-content/uploads/2021/07/Farhan-Abas-Unsplash-UMKM-usaha-kecil-usaha-mikro-2.jpg',
      isHot: false,
      address: 'Jalan situbondo no 10 cindogo tapen bondowoso',
    },
    {
      title: 'Cafe Eterno Jember',
      subtitle: 'Cafe paling terfav dan terkenal di jember',
      image: 'https://blogger.googleusercontent.com/img/a/AVvXsEgsxNEbyIPU6e3Tw8PVRTEQaS6f3rc_Gs03wlmG2Ca2aNUdV9bS5yu63SOGjg0M7hmQ73ZvPC2jcImV2gnZfa3D-6iP6OCndYSFUdHAqMgLim5CdDbrWcNr-zdv60IT_D9I7dv-OYW4YvWurfZKuEEdyiWmGo2XbXxJ9wAz4KjX_yE8m-I1t2ULwJuP=w1200-h630-p-k-no-nu',
      isHot: true,
      address: 'Jalan situbondo no 15 cindogo tapen bondowoso',
    },
  ];

  const renderItem = ({ item }) => (
    <ShopCardVertical {...item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search shops..."
        />
      </View>

      <FlatList
        data={shopData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom:heightPercentageToDP(10),
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});

export default SearchShop;
