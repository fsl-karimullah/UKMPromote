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
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
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

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const [username, setUsername] = useState(userData.data.data.name);
  const [email, setEmail] = useState(userData.data.data.email);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    console.log(userData.data.data.token);
  }, []);

  const handleUsernameChange = text => {
    setUsername(text);
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handleEditProfile = () => {
    console.log('Edit Profile clicked!');
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(endpoint.logoutUser, {
        headers: {
          Authorization: `Bearer ${userData.data.data.token}`,
        },
      });

      if (response.status === 200) {
        console.log('success');
        navigation.popToTop();
      } else {
        console.error('Logout failed:', response.status, response.statusText);
        Alert.alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error.message);
      Alert.alert('An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={{uri: 'https://placekitten.com/200/200'}}
        style={styles.profileImage}
      /> */}

      <Image
        source={{uri: userData.data.data.avatar ? userData.data.data.avatar : 'https://place-hold.it/200x200'}}
        style={styles.profileImage}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={handleUsernameChange}
            placeholder="Enter your username"
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
            onChangeText={handleEmailChange}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <MaterialIcon
            name="pencil"
            size={20}
            color="#555"
            style={styles.inputIcon}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <MaterialIcon name="pencil" size={24} color="#fff" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={toggleModal}>
        <MaterialIcon name="logout" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.textModal}>Apakah anda ingin keluar?</Text>
            <View style={styles.buttonContainer}>
              <ButtonPrimary title="Iya" onPress={handleLogout} />
              <ButtonGray title="Tidak" onPress={toggleModal} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textModal: {
    fontFamily: InterBold,
    fontSize: 20,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 20,
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
