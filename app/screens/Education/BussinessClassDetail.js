import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_BLACK, COLOR_GRAY_LIGHT } from '../../resources/colors';
import { endpoint } from '../../api/endpoint';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const BusinessClassDetail = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const getTokenAndFetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('@userToken');
        if (token) {
          setUserToken(token);
          const response = await axios.get(endpoint.getEducationById(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getTokenAndFetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: `https://drive.google.com/uc?export=download&id=${data.gdrive_link.split('/')[5]}` }}
        style={styles.video}
        controls={true}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.datePosted}>Date Posted: {new Date(data.created_at).toLocaleDateString()}</Text>
        <Text style={styles.desc}>{data.description}</Text>
        {data.free && <Text style={styles.tag}>Gratis</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  video: {
    height: heightPercentageToDP(26),
    width: widthPercentageToDP(100),
    alignSelf: 'center',
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
  tag: {
    fontSize: 14,
    fontFamily: InterMedium,
    backgroundColor: '#007bff',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  datePosted: {
    fontSize: 14,
    fontFamily: InterMedium,
    color: COLOR_GRAY_LIGHT,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: COLOR_BLACK,
  },
});

export default BusinessClassDetail;
