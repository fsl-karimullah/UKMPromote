import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { InterBold, InterMedium } from '../../resources/fonts';
import { COLOR_BLACK, COLOR_GRAY_LIGHT } from '../../resources/colors';
import images from '../../resources/images';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const BusinessClassDetail = () => {
  const imageUrl = images.BannerExample; 
  const title = 'Business Class Title';
  const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id nunc in nisi aliquam interdum.';
  const isFree = true;
  const datePosted = 'March 25, 2024';

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={imageUrl} style={styles.image} />

      {/* Details */}
      <View style={styles.detailsContainer}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Date Posted */}
        <Text style={styles.datePosted}>Date Posted: {datePosted}</Text>

        {/* Description */}
        <Text style={styles.desc}>{desc}</Text>

        {/* Free Tag */}
        {isFree && <Text style={styles.tag}>Gratis</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    height: 200,
    resizeMode: 'cover',
    width:widthPercentageToDP(100),
    alignSelf:'center'
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
});

export default BusinessClassDetail;
