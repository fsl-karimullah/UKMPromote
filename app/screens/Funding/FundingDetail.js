import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR_PRIMARY, COLOR_RED_TRANSPARENT } from '../../resources/colors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useRoute } from '@react-navigation/native';  
import { InterBold, InterMedium } from '../../resources/fonts';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';

const FundingDetail = () => {
    const route = useRoute(); 
    const {
      investorImage,
      investorProfile,
      investorPosition,
      investorDescription,
    } = route.params || {};

    return (
        <>
        <ScrollView style={styles.container}>
          <View style={styles.bannerContainer}>
            <View style={styles.banner} />
          </View>
    
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: investorImage }} style={styles.avatar} />
            </View>
            <View style={styles.socialCard}>
            <Pressable style={styles.socialIconContainer}>
              <Icon name="facebook-official" size={30} color="#3b5998" style={styles.socialIcon} />
            </Pressable>
            <Pressable style={styles.socialIconContainer}>
              <Icon name="twitter" size={30} color="#1da1f2" style={styles.socialIcon} />
            </Pressable>
            <Pressable style={styles.socialIconContainer}>
              <Icon name="linkedin" size={30} color="#0077b5" style={styles.socialIcon} />
            </Pressable>
            <Pressable style={styles.socialIconContainer}>
              <Icon name="whatsapp" size={30} color="#25D366" style={styles.socialIcon} />
            </Pressable>
          </View>
            <Text style={styles.name}>{investorProfile}</Text>
            <Text style={styles.title}>{investorPosition}</Text>
          </View>
    
          <Text style={styles.description}>{investorDescription}</Text>
    
         
        </ScrollView>
        <View style={styles.buttonContainer}>
            <ButtonPrimary title='Ajukan Pendanaan' />
        </View>
        </>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    height: heightPercentageToDP(20),
    width: '100%',
    backgroundColor: COLOR_PRIMARY,
    borderBottomLeftRadius: widthPercentageToDP(20),
    borderBottomRightRadius: widthPercentageToDP(20),
    overflow: 'hidden',
  },
  banner: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -widthPercentageToDP(15),
  },
  avatarContainer: {
    backgroundColor: COLOR_RED_TRANSPARENT,
    borderRadius: 100,
    padding: widthPercentageToDP(3),
  },
  avatar: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(30),
    borderRadius: widthPercentageToDP(15),
  },
  name: {
    marginTop: widthPercentageToDP(3),
    fontSize: widthPercentageToDP(6),
    textAlign: 'center',
    fontFamily:InterBold,
    color:'black'
  },
  title: {
    marginTop: widthPercentageToDP(1),
    fontSize: widthPercentageToDP(4),
    color: '#555',
    textAlign: 'center',
    fontFamily:InterBold
  },
  description: {
    fontSize: 15,
    fontFamily: InterMedium,
    color: 'black',
    lineHeight: 22,
    margin: 10,
    textAlign:'left'
  },
  socialCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: widthPercentageToDP(5),
  },
  socialIconContainer: {
    borderRadius: widthPercentageToDP(7),
    padding: widthPercentageToDP(3),
    marginHorizontal: widthPercentageToDP(2),
    backgroundColor: COLOR_PRIMARY,
  },
  socialIcon: {
    fontSize: widthPercentageToDP(7),
    color: '#fff',
  },

  buttonText: {
    color: 'white',
    fontSize: widthPercentageToDP(5),
  },
  buttonContainer:{
    padding:10
  }
});

export default FundingDetail;
