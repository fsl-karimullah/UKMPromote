import React from 'react';
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

const LoginScreen = ({navigation}) => {
  const handleLoginPress = () => {
    console.log('Login button pressed');
    navigation.navigate('Tab');
  };

  const handleCreateAccountPress = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleForgotPasswordPress = () => {
    console.log('Forgot Password text pressed');
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
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={handleForgotPasswordPress}>
              <Text style={styles.forgotPasswordText}>Lupa Password ?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={handleCreateAccountPress}>
            <Text style={styles.buttonTextRegister}>Buat Akun Baru</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.textBottom}>Atau</Text>
          </View>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleCreateAccountPress}>
            <View style={{display:'flex', flexDirection:'row'}}>
            <Ionicons name="logo-google" size={24} color="black" style={{marginRight:15}} />
            <Text style={styles.buttonTextRegister}>Login Dengan Google</Text>
            </View>
          </TouchableOpacity>
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
    fontWeight: 'bold',
    marginRight: 5,
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
  loginButton: {
    backgroundColor: COLOR_PRIMARY,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: COLOR_GRAY_SECONDARY,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: COLOR_GRAY_THIRD,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: InterBold,
  },
  buttonTextRegister: {
    color: 'black',
    fontSize: 18,
    fontFamily: InterBold,
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

export default LoginScreen;
