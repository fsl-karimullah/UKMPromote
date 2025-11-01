import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoint } from '../../api/endpoint';

const { width } = Dimensions.get('window');
const videoHeight = width * 0.56; // 16:9 ratio

const OnlineCourseVideo = () => {
  const route = useRoute();
  const { id } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const getTokenAndFetch = async () => {
      try {
        const token = await AsyncStorage.getItem('@userToken');
        setUserToken(token);
        if (token) await fetchCourse(token);
      } catch (error) {
        console.error(error);
      }
    };
    getTokenAndFetch();
  }, []);

  const fetchCourse = async token => {
    try {
      const response = await axios.get(endpoint.getCoursesDetails(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Extract YouTube Video ID
  const extractYouTubeId = url => {
    if (!url) return null;
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
    if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
    if (url.includes('embed/')) return url.split('embed/')[1].split('?')[0];
    return null;
  };

  // Normalize video URL (for WebView)
  const normalizeVideoUrl = url => {
    if (!url) return '';

    if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`;
    if (url.includes('youtube.com/watch?v=')) return `https://www.youtube.com/embed/${url.split('v=')[1].split('&')[0]}`;
    if (url.includes('youtube.com/embed/')) return url;

    if (url.includes('drive.google.com')) {
      let fileId = '';
      if (url.includes('/file/d/')) fileId = url.split('/file/d/')[1].split('/')[0];
      if (url.includes('open?id=')) fileId = url.split('open?id=')[1].split('&')[0];
      if (fileId) return `https://drive.google.com/file/d/${fileId}/preview`;
    }

    if (url.includes('wa.me') || url.includes('whatsapp.com')) {
      Linking.openURL(url).catch(err => console.error('Failed to open WhatsApp:', err));
      return '';
    }

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
      <ScrollView>
        {/* Course Banner */}
        <ImageBackground
          source={{ uri: course.thumbnail }}
          style={styles.banner}
          imageStyle={{ opacity: 0.5 }}
          blurRadius={2}>
          <View style={styles.bannerOverlay}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.mentor}>👤 {course.mentor}</Text>
          </View>
        </ImageBackground>

        {/* Video Player */}
        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>{currentVideo.title}</Text>
          <View style={styles.videoContainer}>
            {currentVideo.url.includes('youtube.com') || currentVideo.url.includes('youtu.be') ? (
              <YoutubePlayer
                height={videoHeight}
                play={true}
                videoId={extractYouTubeId(currentVideo.url)}
              />
            ) : (
              <WebView
                source={{ uri: normalizeVideoUrl(currentVideo.url) }}
                style={styles.video}
                javaScriptEnabled
                mediaPlaybackRequiresUserAction={false}
                originWhitelist={['*']}
              />
            )}
          </View>
        </View>

        {/* Horizontal Video List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daftar Materi</Text>
        </View>
        <FlatList
          horizontal
          data={course.videos}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.videoList}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.videoItem,
                index === currentVideoIndex && styles.videoItemActive,
              ]}
              onPress={() => setCurrentVideoIndex(index)}>
              <View style={styles.videoThumbContainer}>
                <ImageBackground
                  source={{ uri: course.thumbnail }}
                  style={styles.videoThumb}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <View style={styles.thumbOverlay}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </ImageBackground>
              </View>
              <Text
                numberOfLines={2}
                style={[
                  styles.videoItemText,
                  index === currentVideoIndex && styles.videoItemTextActive,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnlineCourseVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f141a',
  },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  banner: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    borderRadius: 12,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  mentor: {
    fontSize: 14,
    color: '#dcdcdc',
    marginTop: 6,
  },
  videoCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#1c2229',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    padding: 12,
  },
  videoContainer: { height: videoHeight, backgroundColor: '#000' },
  video: { flex: 1 },

  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  videoList: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  videoItem: {
    width: width * 0.4,
    backgroundColor: '#1a1f25',
    borderRadius: 12,
    paddingBottom: 10,
    overflow: 'hidden',
  },
  videoItemActive: {
    backgroundColor: '#2D9CDB',
  },
  videoThumbContainer: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoThumb: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  thumbOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 22,
    opacity: 0.9,
  },
  videoItemText: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 6,
    paddingHorizontal: 8,
  },
  videoItemTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
});
