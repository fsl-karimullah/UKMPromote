import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { InterBold, InterRegular } from '../../resources/fonts';
import { currencyFormat } from '../../resources/helper';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - 20 * 2 - CARD_MARGIN) / 2; // sama seperti di FlatList

const TemplateCard = ({ template, onBuyPress, onPreviewPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: template.thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{template.name}</Text>
        <Text style={styles.price}>{currencyFormat(template.price)}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {template.description}
        </Text> 
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buyButton} onPress={onBuyPress}>
            <Text style={styles.buttonText}>Beli</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.previewButton} onPress={onPreviewPress}>
            <Text style={styles.buttonText}>Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TemplateCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: CARD_WIDTH,
  },
  thumbnail: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: InterBold,
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontFamily: InterBold,
    color: '#d32f2f',
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    color: '#666',
    fontFamily: InterRegular,
    lineHeight: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buyButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 6,
    borderRadius: 6,
    flex: 1,
  },
  previewButton: {
    backgroundColor: '#424242',
    paddingVertical: 6,
    borderRadius: 6,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: InterBold,
    textAlign: 'center',
  },
});
