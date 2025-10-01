import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { InterBold, InterRegular } from '../../resources/fonts';
import ButtonPrimary from '../Buttons/ButtonPrimary';

const { width } = Dimensions.get('window');

const CardWebinar = ({ webinar, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: webinar.thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{webinar.title}</Text>

        {webinar.description ? (
          <RenderHTML
            contentWidth={width - 30} // card padding 15 each side
            source={{ html: webinar.description }}
            baseStyle={styles.description}
            tagsStyles={{
              p: { marginBottom: 4 },
              li: { marginBottom: 2 },
            }}
            defaultTextProps={{
              numberOfLines: 3,
              ellipsizeMode: 'tail',
            }}
          />
        ) : null}

        <ButtonPrimary title={'Lihat Detail'} onPress={onPress} />
      </View>
    </View>
  );
};

export default CardWebinar;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontFamily: InterBold,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontFamily: InterRegular,
    lineHeight: 20,
  },
});
