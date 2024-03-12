import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { COLOR_GRAY_SECONDARY, COLOR_PRIMARY, COLOR_SUCCESS, COLOR_WHITE } from '../../resources/colors';
import images from '../../resources/images';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';
import { InterBold, InterMedium } from '../../resources/fonts';

const InformationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={images.InfoEmail} style={styles.successImage} />
        <Text style={styles.infoText}>Email untuk Mengatur Ulang Password Telah Dikirim</Text>
        <Text style={styles.descriptionText}>
          Silahkan cek email Anda untuk mengubah password Anda. Jika tidak ada di bagian kontak masuk email, cek di bagian spam.
        </Text>
        <Text style={styles.descriptionText}>
            Email mungkin bisa masuk sekitar 5 - 10 menit
        </Text>
       <View style={styles.button}>
       <ButtonPrimary
          title="Kembali ke Login"
          onPress={() => navigation.navigate('Intro')}
        />
       </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: widthPercentageToDP(10),
    borderRadius: 8,
    backgroundColor: COLOR_GRAY_SECONDARY,
    width: widthPercentageToDP(95),
  },
  successImage: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(20),
    resizeMode: 'contain',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: COLOR_SUCCESS,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily:InterBold
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLOR_PRIMARY,
    marginBottom: 20,
    fontFamily:InterMedium
  },
  button:{
    width:widthPercentageToDP(70)
  }
});

export default InformationScreen;
