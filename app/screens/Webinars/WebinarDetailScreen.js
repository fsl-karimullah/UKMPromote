import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Linking,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {endpoint} from '../../api/endpoint';
import {InterBold, InterRegular} from '../../resources/fonts';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ButtonPrimary from '../../components/Buttons/ButtonPrimary';
import RenderHTML from 'react-native-render-html';

const {width} = Dimensions.get('window');

const WebinarDetailScreen = ({route}) => {
  const {id} = route.params;
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWebinarDetails = async () => {
    try {
      const response = await axios.get(`${endpoint.getWebinars}/${id}`);
      setWebinar(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load webinar details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinarDetails();
  }, [id]);

  const handleRegister = () => {
    if (webinar && webinar.registration_url) {
      Linking.openURL(webinar.registration_url);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#e53935" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {/* Scrollable content */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Webinar Thumbnail Image */}
            <Image
              source={{uri: webinar.thumbnail}}
              style={styles.thumbnail}
              resizeMode="contain"
            />

            {/* Webinar Title */}
            <Text style={styles.title}>{webinar.title}</Text>

            {/* Webinar Description with HTML parsing */}
            <View style={styles.description}>
              <RenderHTML
                contentWidth={width - 32}
                source={{html: webinar.description}}
                baseStyle={{fontFamily: InterRegular, color: '#666', lineHeight: 24}}
              />
            </View>
          </ScrollView>

          {/* Register Button fixed at the bottom */}
          <View style={styles.buttonContainer}>
            <ButtonPrimary title={'Enroll'} onPress={handleRegister} />
          </View>
        </>
      )}
    </View>
  );
};

export default WebinarDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  thumbnail: {
    width: widthPercentageToDP(95),
    height: heightPercentageToDP(50),
    borderRadius: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    marginVertical: 12,
    paddingHorizontal: 16,
    color: '#000',
    fontFamily: InterBold,
    textAlign: 'center',
    lineHeight: 32,
  },
  description: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: InterRegular,
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
  },
});
