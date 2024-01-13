import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Foundation';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ShopSlider from '../../components/Slider/ShopSlider';
import {InterBold, InterMedium, InterRegular} from '../../resources/fonts';
import ButtonIcon from '../../components/Buttons/ButtonIcon';
import {COLOR_PRIMARY} from '../../resources/colors';

const DetailShop = () => {
  const bannerImages = [
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View>
          <ShopSlider
            images={bannerImages}
            onClick={() => console.log('tes')}
          />
        </View>

        <View style={styles.tagContainer}>
          <View>
            <Text style={[styles.tag, styles.popularTag]}>Jasa</Text>
          </View>
          <View style={styles.iconContainer}>
            <Pressable style={styles.locationIcon}>
              <Ionicons name="location-sharp" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.heartIcon}>
              <Ionicons name="heart" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={{margin: 10}}>
          <Text style={styles.title}>Geprek AA</Text>
          <Text style={styles.addressText}>
            Provinsi Jawa Timur, Kabupaten Jember, Kota Jember
          </Text>
          <Text style={styles.addressText}>Jalan jember no. 54 mastrip</Text>
          <View
            style={{display: 'flex', flexDirection: 'row', marginVertical: 10,}}>
            <Pressable style={styles.iconTitle}>
              <Icon name="web" size={34} color={COLOR_PRIMARY} style={{marginRight:5}} />
              <Text style={styles.subTitle}>Website</Text>
            </Pressable>
            <Pressable style={styles.iconTitle}>
              <Icon name="insta" size={34} color={COLOR_PRIMARY} style={{marginHorizontal:5}} />
              <Text style={styles.subTitle}>Instagram</Text>
            </Pressable>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            gravida purus diam, ac dapibus turpis ultricies id.
          </Text>
        </View> 
      </ScrollView>
      <View
        style={{
          margin: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <ButtonIcon iconName={'whatsapp'} title={'Hubungi'} />
        <ButtonIcon iconName={'star'} title={'Favorit'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 15,
    fontFamily: InterBold,
    color: 'black',
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  locationIcon: {
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },

  heartIcon: {
    backgroundColor: 'lightgray',
    borderRadius: 50,
    padding: 10,
  },
  iconTitle: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  tag: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  popularTag: {
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
    fontFamily: InterBold,
  },
  title: {
    fontSize: 24,
    fontFamily: InterBold,
    color: 'black',
  },
  addressText: {
    fontSize: 12,
    fontFamily: InterMedium,
    color: 'black',
  },
  description: {
    fontSize: 16,
    fontFamily: InterRegular,
    color: 'black',
  },
});

export default DetailShop;
