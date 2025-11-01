import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_BLACK, COLOR_GRAY_LIGHT } from '../../resources/colors';
import { endpoint } from '../../api/endpoint';

const { width } = Dimensions.get('window');
const videoHeight = (width / 16) * 9; // maintain 16:9 ratio

const BusinessClassDetail = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTokenAndFetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('@userToken');
        if (token) {
          const response = await axios.get(endpoint.getEducationById(id), {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(response.data.data);
        } else {
          console.warn('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    getTokenAndFetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
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

  // 🧠 Fix Google Drive embed link
  const gdriveLink = data.gdrive_link;
  const embedUrl = gdriveLink?.includes('/preview')
    ? gdriveLink
    : gdriveLink?.replace('/view', '/preview');

  return (
    <ScrollView style={styles.container}>
      {/* 🎥 VIDEO PLAYER */}
      {embedUrl ? (
        <View style={styles.videoContainer}>
          <WebView
            source={{
              html: `
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      html, body {
                        margin: 0;
                        padding: 0;
                        background-color: black;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      }
                      iframe {
                        width: 100%;
                        height: 100%;
                        border: none;
                        border-radius: 12px;
                      }
                    </style>
                  </head>
                  <body>
                    <iframe
                      src="${embedUrl}"
                      allow="autoplay; fullscreen"
                      allowfullscreen>
                    </iframe>
                  </body>
                </html>
              `,
            }}
            style={{ width: '100%', height: videoHeight }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            mediaPlaybackRequiresUserAction={false}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={styles.errorText}>Video not available.</Text>
      )}

      {/* 📖 DETAILS */}
      <View style={styles.detailsCard}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.datePosted}>
          Date Posted: {new Date(data.created_at).toLocaleDateString()}
        </Text>

        {data.free ? <Text style={styles.tag}>Gratis</Text> : null}

        <Text style={styles.desc}>
          {typeof data.description === 'string'
            ? data.description
            : 'No description available.'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa' },

  videoContainer: {
    width: width,
    height: videoHeight,
    backgroundColor: '#000',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    elevation: 5,
  },

  detailsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontFamily: InterBold,
    color: COLOR_BLACK,
    marginBottom: 6,
  },

  datePosted: {
    fontSize: 13,
    fontFamily: InterMedium,
    color: COLOR_GRAY_LIGHT,
    marginBottom: 10,
  },

  tag: {
    fontSize: 13,
    fontFamily: InterMedium,
    backgroundColor: '#4CAF50',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  desc: {
    fontSize: 15,
    fontFamily: InterMedium,
    color: COLOR_BLACK,
    lineHeight: 22,
  },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: COLOR_BLACK },
});

export default BusinessClassDetail;
