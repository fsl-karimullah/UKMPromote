import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable, ScrollView, Linking} from 'react-native';
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

const DetailShop = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  const bannerImages = [
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
    'https://storage.googleapis.com/fastwork-static/7afd414f-4746-4914-abcb-8ff86133d1bd.jpg',
  ];

  const openingHours = [
    {day: 'Monday', hours: '08:00 - 18:00'},
    {day: 'Tuesday', hours: '08:00 - 18:00'},
  ];

  const handleInstagramPress = () => {
    // Replace 'instagram_username' with the actual Instagram username
    Linking.openURL('https://www.instagram.com/instagram_username/');
  };

  const handleWebsitePress = () => {
    // Replace 'example.com' with the actual website URL
    Linking.openURL('https://www.example.com');
  };

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
            images={bannerImages}
            onClick={() => console.log('tes')}
          />
        </View>

        <View style={styles.tagContainer}>
          <Text style={[styles.tag, styles.popularTag]}>Jasa</Text>
          <View style={styles.iconContainer}>
            <Pressable style={styles.locationIcon}>
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
                {openingHours.map((item, index) => (
                  <View key={index} style={styles.hoursContainer}>
                    <Text style={styles.dayText}>{item.day}:</Text>
                    <Text style={styles.hoursText}>{item.hours}</Text>
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
          <Text style={styles.title}>Geprek AA</Text>
          <Text style={styles.addressText}>
            Provinsi Jawa Timur, Kabupaten Jember, Kota Jember
          </Text>
          <Text style={styles.addressText}>Jalan Jember No. 54 Mastrip</Text>
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

          <Text style={styles.description}>
            Officia aliquip aliqua adipisicing laboris ipsum proident. Dolore
            culpa deserunt commodo proident nulla. Ad commodo ea do officia
            sint. Enim ullamco nostrud ipsum culpa quis eu. Aliquip in sit
            cupidatat fugiat qui occaecat consequat enim anim consectetur.
            Proident adipisicing amet deserunt cillum magna esse amet eu laboris
            magna aliquip. Commodo et et sunt esse amet commodo exercitation
            dolore qui cupidatat. Irure labore non pariatur esse esse ut anim
            dolor fugiat dolor laboris nisi. Qui exercitation sint veniam dolore
            veniam proident minim nostrud tempor. Magna non incididunt ut
            officia do deserunt quis elit ex consectetur sunt velit
            exercitation. Commodo non et qui velit nulla fugiat nostrud
            adipisicing ipsum voluptate.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonIcon iconName="whatsapp" title="Hubungi" />
        <ButtonIcon iconName="star" title="Favorit" />
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
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
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
    fontWeight: 'bold',
    marginRight: 5,
    color: '#333',
  },
  hoursText: {
    color: '#333',
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
});

export default DetailShop;
