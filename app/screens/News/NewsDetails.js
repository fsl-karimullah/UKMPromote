import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { endpoint } from '../../api/endpoint';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_BLACK, COLOR_GRAY_LIGHT, COLOR_PRIMARY, COLOR_RED } from '../../resources/colors';
import images from '../../resources/images';

const NewsDetails = ({ route }) => {
  const { id } = route.params;
  const [userToken, setUserToken] = useState();
  const [newsDetails, setNewsDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTokenData();
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchNewsData();
    }
  }, [userToken]);

  const getTokenData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userToken');
      if (value !== null) {
        setUserToken(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchNewsData = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(endpoint.getNewsDetails(id), {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setNewsDetails(response.data.data);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching news details.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLOR_PRIMARY} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : newsDetails ? (
        <>
          <Image
            source={{ uri: newsDetails.thumbnail }}
            style={styles.image}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{newsDetails.title}</Text>

            <Text style={styles.datePosted}>
              Pada : {formatDate(newsDetails.created_at)}
            </Text>

            <Text style={styles.desc}>{newsDetails.description}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.error}>No news details found.</Text>
      )}
    </View>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    height: 200,
    resizeMode: 'cover',
    width: widthPercentageToDP(100),
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: InterBold,
    color: COLOR_BLACK,
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    fontFamily: InterMedium,
    color: COLOR_BLACK,
    marginBottom: 12,
  },
  datePosted: {
    fontSize: 14,
    fontFamily: InterMedium,
    color: COLOR_GRAY_LIGHT,
    marginBottom: 8,
  },
  error: {
    fontSize: 16,
    fontFamily: InterMedium,
    color: COLOR_RED,
    textAlign: 'center',
  },
});
