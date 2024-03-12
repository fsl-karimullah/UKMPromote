import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InterBold, InterMedium} from '../../resources/fonts';
import images from '../../resources/images';
import {
  COLOR_GRAY_SECONDARY,
  COLOR_GRAY_THIRD,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
} from '../../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';
import ButtonGray from '../../components/Buttons/ButtonGray';
import {endpoint} from '../../api/endpoint';
import axios from 'axios';
import {showToast} from '../../resources/helper';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      showToast('error', 'Gagal', 'Email harus diisi');
      return;
    }
    setisLoading(true);

    try {
      const response = await axios.post(endpoint.forgotPassword, {email});
      console.log(response.data.email);
      showToast('info', 'Informasi', response.data.email);
      navigation.navigate('InformationResetPassword');
    } catch (error) {
      showToast(
        'error',
        'Gagal',
        'Terjadi kesalahan, mohon masukkan email dengan benar.',
      );
    } finally {
      setisLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Silahkan Masukkan Email</Text>
          <Text style={styles.headerSubtitle}>
            Masukkan email yang terdaftar dan aktif
          </Text>
        </View>
        <View style={styles.content}>
          <Image
            source={images.ForgotPassword}
            style={styles.illustratorImage}
          />
          <Text style={styles.introText}>Reset Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <ButtonPrimary
            title="Kirim Email Reset Password"
            isLoading={isLoading}
            onPress={handleForgotPassword}
          />
          <ButtonGray title="Kembali" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
      {/* <View style={styles.containerCopyright}>
          <Text style={styles.signInText}>Maded With ❤️ By Sixeyes Technologies</Text>
        </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    marginRight: 5,
    fontFamily: InterBold,
    color: 'black',
  },
  textBottom: {
    fontSize: 24,
    fontFamily: InterBold,
    marginRight: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: InterMedium,
    color: 'black',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  illustratorImage: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(30),
    marginBottom: 20,
    resizeMode: 'cover',
    borderRadius: 8,
    alignSelf: 'center',
  },
  introText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    fontFamily: InterBold,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 16,
    color: 'black',
    fontFamily: InterMedium,
  },

  googleButton: {
    backgroundColor: COLOR_GRAY_THIRD,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  signInText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: InterMedium,
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 10,
    fontFamily: InterMedium,
  },
  containerCopyright: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
});

export default ForgotPassword;
