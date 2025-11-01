import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { InterBold, InterRegular } from '../../resources/fonts';

const CardWebinar = ({ webinar, onPress, width }) => {
  return (
    <TouchableOpacity style={[styles.cardContainer, { width }]} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: webinar.thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {webinar.title}
        </Text>

        {webinar.description ? (
          <RenderHTML
            contentWidth={width - 24}
            source={{ html: webinar.description }}
            baseStyle={styles.description}
            tagsStyles={{ p: { marginBottom: 2 } }}
          />
        ) : null}

        <View style={styles.buttonContainer}>
          <Text style={styles.detailText}>Lihat Detail →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardWebinar;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    marginBottom: 6,
    color: '#333',
    fontFamily: InterBold,
  },
  description: {
    fontSize: 11,
    color: '#666',
    fontFamily: InterRegular,
    lineHeight: 15,
    marginBottom: 8,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  detailText: {
    fontSize: 12,
    color: '#e53935',
    fontFamily: InterBold,
  },
});
