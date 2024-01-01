import React from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { InterBold, InterMedium } from '../../resources/fonts';
import images from '../../resources/images';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { COLOR_PRIMARY } from '../../resources/colors';

const Register = () => {
  const handleRegisterPress = () => {
    console.log('Register button pressed');
  };

  const handleTermsPress = () => {
    console.log('Terms of Service or Privacy Policy pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView style={styles.innerContainer} behavior="padding">
          <Image source={images.RegisterIlu} style={styles.illuImg} />
          <Text style={styles.title}>Daftar</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#7E7E7E"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#7E7E7E"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#7E7E7E"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="#7E7E7E"
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterPress}
          >
            <Text style={styles.buttonText}>Daftar</Text>
          </TouchableOpacity>

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
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
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
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
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
  registerButton: {
    backgroundColor: COLOR_PRIMARY,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width:widthPercentageToDP(70)
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Register;
