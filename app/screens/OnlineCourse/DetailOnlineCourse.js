import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {endpoint} from '../../api/endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import RenderHTML from 'react-native-render-html';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const {width} = Dimensions.get('window');
const imageHeight = heightPercentageToDP('60%');

const DetailOnlineCourse = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {id} = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const getTokenAndFetch = async () => {
      try {
        const value = await AsyncStorage.getItem('@userToken');
        setUserToken(value);
        if (value) {
          await fetchCourseDetail(value);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting token:', error);
        setLoading(false);
      }
    };
    getTokenAndFetch();
  }, []);

  const fetchCourseDetail = async token => {
    try {
      const response = await axios.get(endpoint.getCoursesDetails(id), {
        headers: {Authorization: `Bearer ${token}`},
      });
      setCourse(response.data.data);
    } catch (error) { 
      console.error('Error fetching detail:', error);
    } finally {
      setLoading(false);
    }
  };


const normalizeVideoUrl = (url) => {
  if (!url) return '';

  // YouTube short link
  if (url.includes('youtu.be/')) {
    return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`;
  }

  // YouTube watch?v= link
  if (url.includes('youtube.com/watch?v=')) {
    return `https://www.youtube.com/embed/${url.split('v=')[1].split('&')[0]}`;
  }

  // YouTube already embed
  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  // Google Drive share or open link -> convert to embed
  if (url.includes('drive.google.com')) {
    let fileId = '';

    // Case: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    if (url.includes('/file/d/')) {
      fileId = url.split('/file/d/')[1].split('/')[0];
    }

    // Case: https://drive.google.com/open?id=FILE_ID
    if (url.includes('open?id=')) {
      fileId = url.split('open?id=')[1].split('&')[0];
    }

    // Rebuild as embed preview
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }

    return url; // fallback
  }

  // WhatsApp links (group invite, chat, etc.)
  if (url.includes('wa.me') || url.includes('whatsapp.com')) {
    // open externally instead of embedding
    Linking.openURL(url).catch(err =>
      console.error('Failed to open WhatsApp link:', err)
    );
    return ''; // return empty so WebView doesn’t try to render it
  }

  // Fallback (other links like Vimeo, etc.)
  return url;
};


  const handleCheckout = async () => {
    if (course.enrolled) {
      navigation.navigate('OnlineCourseVideo', {id: course.id});
    } else {
      try {
        const response = await axios.get(endpoint.checkoutCourses(id), {
          headers: {Authorization: `Bearer ${userToken}`},
        });
        const redirectUrl = response.data.data.redirect_url;
        navigation.navigate('PaymentWebView', {redirectUrl, course});
      } catch (error) {
        console.error(error);
        Alert.alert('Payment Failed', 'Something went wrong, try again later.');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.center}>
        <Text>Data kursus tidak ditemukan.</Text>
      </View>
    );
  }

  const previewVideo = course.videos.length > 0 ? course.videos[0] : null;

  return (
    <ScrollView
      style={styles.container}>
      {/* Thumbnail */}
      <Image source={{uri: course.thumbnail}} style={styles.thumbnail} />

      {/* Title & Info */}
      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.mentor}>👤 {course.mentor}</Text>

        {course.price === 0 ? (
          <Text style={styles.free}>Gratis</Text>
        ) : (
          <View style={styles.priceContainer}>
            {course.discount > 0 && (
              <Text style={styles.discount}>-{course.discount}%</Text>
            )}
            <Text style={styles.price}>Rp {course.price.toLocaleString()}</Text>
          </View>
        )}
      </View>

      {/* Description toggle */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowDescription(!showDescription)}>
        <Text style={styles.toggleText}>Deskripsi</Text>
        <Text style={styles.toggleArrow}>{showDescription ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showDescription && (
        <View style={styles.content}>
          <RenderHTML
            contentWidth={width - 32}
            source={{html: course.description}}
            baseStyle={styles.description}
          />
        </View>
      )}

      {/* Video toggle */}
      {previewVideo && (
        <>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowVideo(!showVideo)}>
            <Text style={styles.toggleText}>Preview Kelas</Text>
            <Text style={styles.toggleArrow}>{showVideo ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showVideo && (
            <View style={styles.section}>
              <Text style={styles.videoTitle}>{previewVideo.title}</Text>
              <View style={styles.videoContainer}>
                <WebView
                  source={{uri: normalizeVideoUrl(previewVideo.url)}}
                  style={styles.video}
                  javaScriptEnabled
                  mediaPlaybackRequiresUserAction={false} // autoplay allowed
  originWhitelist={['*']} // make sure GDrive works too
                />
              </View>
            </View>
          )}
        </>
      )}

      {/* Checkout / Belajar Sekarang Button */}
      <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>
          {course.enrolled ? 'Belajar Sekarang' : 'Checkout'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailOnlineCourse;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
 thumbnail: {
  width: widthPercentageToDP(100),
  height: imageHeight, 
  resizeMode: 'contain',
},
  content: {padding: 16},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 6},
  mentor: {fontSize: 14, color: '#555', marginBottom: 10},
  free: {color: 'green', fontWeight: 'bold', fontSize: 15, marginBottom: 8},
  priceContainer: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  discount: {color: 'red', fontWeight: 'bold', fontSize: 14, marginRight: 8},
  price: {fontWeight: 'bold', fontSize: 15},
  description: {fontSize: 14, lineHeight: 20, color: '#333', marginTop: 8},
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  toggleText: {fontSize: 16, fontWeight: '600'},
  toggleArrow: {fontSize: 16},
  section: {padding: 16},
  videoContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  video: {flex: 1},
  videoTitle: {fontSize: 14, fontWeight: '500', marginBottom: 10},
  checkoutBtn: {
    backgroundColor: '#2D9CDB',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
