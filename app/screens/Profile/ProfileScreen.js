import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome'; // for FontAwesome icons
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // for MaterialCommunityIcons
import { COLOR_PRIMARY } from '../../resources/colors';
import { InterBold, InterMedium } from '../../resources/fonts';

const ProfileScreen = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleEditProfile = () => {
    // Add functionality for editing profile
    console.log('Edit Profile clicked!');
  };

  const handleLogout = () => {
    // Add functionality for logout
    console.log('Logout clicked!');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placekitten.com/200/200' }}
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
          <MaterialIcon name="pencil" size={20} color="#555" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <MaterialIcon name="pencil" size={20} color="#555" style={styles.inputIcon} />
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <MaterialIcon name="pencil" size={24} color="#fff" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcon name="logout" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontFamily:InterMedium

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
    width:widthPercentageToDP(90),
    backgroundColor:COLOR_PRIMARY
  },
  editButtonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18,
    fontFamily:InterBold
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    width:widthPercentageToDP(90),
  },
  logoutButtonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18,
    fontFamily:InterBold
  },
});

export default ProfileScreen;
