import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endpoint} from '../../api/endpoint';

const {width, height} = Dimensions.get('window');
const videoHeight = 220;

const OnlineCourseVideo = () => {
  const route = useRoute();
  const {id} = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const getTokenAndFetch = async () => {
      try {
        const token = await AsyncStorage.getItem('@userToken');
        setUserToken(token);
        if (token) {
          await fetchCourse(token);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTokenAndFetch();
  }, []);

  const fetchCourse = async token => {
    try {
      const response = await axios.get(endpoint.getCoursesDetails(id), {
        headers: {Authorization: `Bearer ${token}`},
      });
      setCourse(response.data.data);
    } catch (error) {
      console.error(error);
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

  // Fallback for other links (Vimeo, etc.)
  return url;
};


  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2D9CDB" />
      </View>
    );
  }

  if (!course || !course.videos || course.videos.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No videos available for this course.</Text>
      </View>
    );
  }

  const currentVideo = course.videos[currentVideoIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Course Info */}
      <View style={styles.headerCard}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.mentor}>👤 {course.mentor}</Text>
      </View>

      {/* Video Player */}
      <View style={styles.videoCard}>
        <Text style={styles.videoTitle}>{currentVideo.title}</Text>
        <View style={styles.videoContainer}>
          <WebView
            source={{uri: normalizeVideoUrl(currentVideo.url)}}
            style={styles.video}
            javaScriptEnabled
            mediaPlaybackRequiresUserAction={false} // autoplay allowed
  originWhitelist={['*']} // make sure GDrive works too
          />
        </View>
      </View>

      {/* Video List */}
      <FlatList
        data={course.videos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 32}}
        showsVerticalScrollIndicator={true}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.videoButton,
              index === currentVideoIndex && styles.videoButtonActive, 
            ]}
            onPress={() => setCurrentVideoIndex(index)}>
            <Text
              style={[
                styles.videoButtonText,
                index === currentVideoIndex && styles.videoButtonTextActive,
              ]}>
              {index + 1}. {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default OnlineCourseVideo;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  headerCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  courseTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 6, color: '#333'},
  mentor: {fontSize: 14, color: '#777'},
  videoCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  videoTitle: {fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#2D9CDB'},
  videoContainer: {height: videoHeight, borderRadius: 12, overflow: 'hidden'},
  video: {flex: 1},
  videoButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  videoButtonActive: {backgroundColor: '#2D9CDB'},
  videoButtonText: {color: '#333', fontWeight: '600'},
  videoButtonTextActive: {color: '#fff'},
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
