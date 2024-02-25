import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InterBold, InterMedium, InterRegular} from '../../resources/fonts';
import images from '../../resources/images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLOR_PRIMARY} from '../../resources/colors';
import axios from 'axios';
import {endpoint} from '../../api/endpoint';
import {showToast} from '../../resources/helper';
import {registerUser, resetUser} from '../../redux/slices/userSlices';
import {connect} from 'react-redux';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';

const Register = ({registerUser}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoadingButton, setisLoadingButton] = useState(false);

  const isEmailValid = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegisterPress = () => {
    if (!name || !email || !password || !passwordConfirmation) {
      showToast('error', 'Gagal', 'Harap isi semua kolom');
      return;
    }

    if (!isEmailValid(email)) {
      showToast('error', 'Gagal', 'Email Anda Tidak Valid');
      return;
    }

    if (password !== passwordConfirmation) {
      showToast('error', 'Gagal', 'Password Tidak Sama');
      return;
    }

    const formData = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };
    setisLoadingButton(true);
    axios
      .post(endpoint.registerUser, formData)
      .then(response => {
        showToast('success', 'Sukses', 'Register Berhasil');
        navigation.goBack()
        console.log(response.data);
        registerUser(response.data);
        setEmail('');
        setName('');
        setPassword('');
        setPasswordConfirmation('');
      })
      .catch(error => {
        if (error.response.status === 422) {
          const errors = error.response.data.errors;

          if (errors.email) {
            showToast('error', 'Gagal', 'Email Sudah Digunakan');
          }
        } else {
          console.error('Registration failed!', error.response.data);
        }
      })
      .finally(() => {
        setisLoadingButton(false);
      });
  };

  const handleTermsPress = () => {
    console.log('Terms of Service or Privacy Policy pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
          <Image source={images.RegisterIlu} style={styles.illuImg} />
          <Text style={styles.title}>Daftar</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#7E7E7E"
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#7E7E7E"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#7E7E7E"
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="#7E7E7E"
              value={passwordConfirmation}
              onChangeText={text => setPasswordConfirmation(text)}
            />
          </View>
          <View style={{width: widthPercentageToDP(90)}}>
            <ButtonPrimary
              title={'Daftar'}
              onPress={handleRegisterPress}
              isLoading={isLoadingButton}
            />
          </View>
          <Text style={styles.termsText}>
            By registering, you agree to our{' '}
            <Text style={styles.linkText} onPress={handleTermsPress}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={styles.linkText} onPress={handleTermsPress}>
              Privacy Policy
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  termsText: {
    fontSize: 14,
    color: '#7E7E7E',
    marginTop: 20,
    textAlign: 'center',
    fontFamily:InterRegular
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontFamily:InterRegular
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  illuImg: {
    width: widthPercentageToDP(70),
    height: heightPercentageToDP(30),
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333',
    fontFamily:InterBold
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#7E7E7E',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 16,
    color: '#333333',
    fontFamily: InterMedium,
  },
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(Register);
