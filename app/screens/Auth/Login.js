import React, {useState, useEffect} from 'react';
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
import {registerUser, resetUser} from '../../redux/slices/userSlices';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = ({registerUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLoginPress = async () => {
    try {
      if (!email || !password) {
        showToast('error', 'Gagal', 'Email dan password harus diisi');
        return;
      }

      setisLoading(true);

      const response = await axios.post(
        endpoint.loginUser,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      await AsyncStorage.setItem('userToken', response.data.data.token);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setEmail('');
      setPassword('');
      showToast('success', 'Sukses', 'Selamat Datang');
      registerUser(response.data);
      navigation.navigate('Tab');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        showToast('error', 'Gagal', 'Email atau password salah');
      } else {
        console.error(error);
        showToast('error', 'Gagal', 'Terjadi kesalahan saat login');
      }
    } finally {
      setisLoading(false);
    }
  };

  const handleCreateAccountPress = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ayo Support Brand Lokal</Text>
          <Text style={styles.headerSubtitle}>
            Cari barang atau jasa yang anda butuhkan disini.
          </Text>
        </View>
        <View style={styles.content}>
          <Image source={images.LoginIlu} style={styles.illustratorImage} />

          <Text style={styles.introText}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.toggleEyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForgotPasswordPress}>
              <Text style={styles.forgotPasswordText}>Lupa Password ?</Text>
            </TouchableOpacity>
          </View>
          <ButtonPrimary
            title="Masuk"
            onPress={handleLoginPress}
            isLoading={isLoading}
          />
          <ButtonGray
            title="Buat Akun Baru"
            onPress={() => navigation.navigate('RegisterScreen')}
          />
        </View>
      </ScrollView>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: 'black',
    fontFamily: InterMedium,
  },
  toggleEyeIcon: {
    position: 'absolute',
    right: 10,
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
    marginTop: 10,
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
const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
