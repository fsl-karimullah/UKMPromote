import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { InterBold, InterMedium } from '../../resources/fonts';

const EducationalDetailScreen = ({ route }) => {
  const { title, description, datePosted, youtubeVideoId } = route.params;
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={youtubeVideoId}
        onChangeState={onStateChange}
      />

      <TouchableOpacity style={styles.playButton} onPress={togglePlaying}>
        <Text style={styles.playButtonText}>{playing ? 'Pause' : 'Putar'}</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.datePosted}>{`Date Posted: ${datePosted}`}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  playButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  playButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: InterBold,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: InterBold,
    color: 'black',
  },
  datePosted: {
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
    fontFamily: InterMedium,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: InterMedium,
    color: 'black',
  },
});

export default EducationalDetailScreen;
