import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR_PRIMARY} from '../../resources/colors';
import {InterBold, InterMedium} from '../../resources/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {endpoint} from '../../api/endpoint';
import axios from 'axios';
import Modal from 'react-native-modal';
import ButtonGray from '../../components/Buttons/ButtonGray';
import {
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
} from '../../redux/slices/authSlice';
import ButtonIcon from '../../components/Buttons/ButtonIcon';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../resources/helper';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const userData = useSelector(state => state.user);
  const [userToken, setUserToken] = useState();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState({});
  const [Avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const toggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  useEffect(() => {
    getTokenData();
  }, []);

  const getTokenData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        setUserToken(value);
        await getProfile(value);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUsernameChange = text => {
    setUsername(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handlePasswordConfirmationChange = text => {
    setPasswordConfirmation(text);
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.patch(
        endpoint.updateProfile,
        {
          name: username,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (response.status === 200) {
        showToast(
          'success',
          'Berhasil',
          'Profile berhasil diupgrade, silahkan login lagi',
        );
        await AsyncStorage.removeItem('@userToken');
        await AsyncStorage.setItem('isLoggedIn', 'false');
        setShowEditModal(false);
        navigation.navigate('Intro');
      } else { 
        console.log('Failed to update profile', response.statusText);
        showToast('error', 'Gagal', 'Profile gagal diupdate');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      showToast('error', 'Gagal', 'Profile gagal diupdate');
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@userToken');
    } catch (e) {
      console.log(e);
    }
  };

  const getProfile = async token => {
    try {
      const response = await axios.get(endpoint.getProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const {name, email, avatar} = response.data.data;
        setProfile(response.data.data);
        setUsername(name);
        setEmail(email);
        setAvatar(avatar);
      } else {
        console.error(
          'Failed to fetch profile:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const handleLogout = async () => {
    toggleLogoutModal();

    try {
      const response = await axios.get(endpoint.logoutUser, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        await AsyncStorage.removeItem('@userToken');
        await AsyncStorage.setItem('isLoggedIn', 'false');
        navigation.navigate('Intro');
      } else {
        console.error('Logout failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const handleUploadPress = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (!result.didCancel) {
        console.log('Selected Image:', result.uri);
        setAvatar(result.uri);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  const handleCameraPress = async () => {
    try {
      const cameraPermission = await check(
        Platform.select({
          ios: PERMISSIONS.IOS.CAMERA,
          android: PERMISSIONS.ANDROID.CAMERA,
        }),
      );

      if (cameraPermission === 'granted') {
        const result = await ImagePicker.launchCamera({
          mediaType: 'photo',
          quality: 1,
        });

        if (!result.didCancel) {
          console.log('Captured Image:', result.uri);
          setAvatar(result.uri);
        }
      } else {
        const requestPermissionResult = await request(
          Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA,
          }),
        );

        if (requestPermissionResult === 'granted') {
          handleCameraPress();
        } else {
          Alert.alert(
            'Permission Denied',
            'You need to grant camera permission to use this feature.',
          );
        }
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={showEditModal}
        onBackdropPress={() => setShowEditModal(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={handleUsernameChange}
              placeholder="Username Baru"
            />
            <MaterialIcon
              name="pencil"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
          </View>
          <Text style={styles.textWarning}>Jika anda mengubah password, anda akan diarahkan untuk login lagi. Selalu ingat password anda</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Password Baru"
              secureTextEntry
            />
            <MaterialIcon
              name="pencil"
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={passwordConfirmation}
              onChangeText={handlePasswordConfirmationChange}
              placeholder="Konfirmasi Password"
              secureTextEntry
            />
            <MaterialIcon
              name="pencil" 
              size={20}
              color="#555"
              style={styles.inputIcon}
            />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonPrimary title="Simpan" onPress={handleSaveProfile} />
            <ButtonGray
              title="Batal"
              onPress={() => setShowEditModal(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={showLogoutModal}
        onBackdropPress={toggleLogoutModal}
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        backdropOpacity={0.5}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Konfirmasi Logout</Text>
          <Text style={styles.modalText}>Apakah anda yakin akan keluar ?</Text>
          <View style={styles.buttonContainer}>
            <ButtonPrimary title={'Oke'} onPress={handleLogout} />
            <ButtonGray title={'Tidak'} onPress={toggleLogoutModal} />
          </View>
        </View>
      </Modal>
      <View>
        <Image
          source={{
            uri: Avatar ? Avatar : 'https://place-hold.it/200x200',
          }}
          style={styles.profileImage}
        />
        <Pressable onPress={() => setShowModal(true)}>
          <Text style={styles.title}>Upload foto</Text>
        </Pressable>
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
          <Text style={styles.modalTitle}>Pilih Opsi</Text>
          <View style={styles.dropdownContainer}>
            <View style={styles.containerIcon}>
              <TouchableOpacity
                onPress={handleUploadPress}
                style={styles.optionContainer}>
                <View style={styles.iconContainer}>
                  <Icon name="upload" size={30} color="black" />
                </View>
                <Text>Upload Foto</Text>
              </TouchableOpacity>

              <Text style={styles.orText}>OR</Text>

              <TouchableOpacity
                onPress={handleCameraPress}
                style={styles.optionContainer}>
                <View style={styles.iconContainer}>
                  <Icon name="camera" size={30} color="black" />
                </View>
                <Text>Kamera</Text>
              </TouchableOpacity>
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
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={handleUsernameChange}
            editable={false}
            placeholder="Tulis username anda"
          />
          <MaterialIcon
            name="pencil"
            size={20}
            color="#555"
            style={styles.inputIcon}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            editable={false}
            placeholder="Tulis email anda"
          />
          <MaterialIcon
            name="email"
            size={20}
            color="#555"
            style={styles.inputIcon}
          />
        </View>
        {/* <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Masukkan password baru"
            secureTextEntry
          />
          <MaterialIcon
            name="pencil"
            size={20}
            color="#555"
            style={styles.inputIcon}
          />
        </View> */}
        {/* <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={passwordConfirmation}
            onChangeText={handlePasswordConfirmationChange}
            placeholder="Konfirmasi password baru"
            secureTextEntry
          />
          <MaterialIcon
            name="pencil"
            size={20}
            color="#555"
            style={styles.inputIcon}
          />
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <MaterialIcon name="content-save" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={toggleLogoutModal}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWarning:{
    textAlign:'center',
    fontFamily:InterMedium,
    color:'#000',
    marginBottom:10
  },
  containerIcon: {
    alignItems: 'center',
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 8,
  },
  orText: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 15,
    fontFamily: InterBold,
    color: 'blue',
    marginBottom: 5,
    textAlign: 'center',
  },
  textModal: {
    fontFamily: InterBold,
    fontSize: 20,
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
    marginBottom: 10,
    color: '#333',
    fontFamily: InterBold,
  },

  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: InterMedium,
    fontSize: 15,
  },

  buttonContainer: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
    fontFamily: InterMedium,
  },
  inputIcon: {
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: widthPercentageToDP(90),
    backgroundColor: COLOR_PRIMARY,
  },
  editButtonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18,
    fontFamily: InterBold,
  },
  logoutButton: {
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    width: widthPercentageToDP(90),
  },
  logoutButtonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18,
    fontFamily: InterBold,
  },
});

export default ProfileScreen;
