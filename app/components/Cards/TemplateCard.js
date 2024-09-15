import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { InterBold, InterRegular } from '../../resources/fonts';
import { currencyFormat } from '../../resources/helper';

const TemplateCard = ({ template, onBuyPress, onPreviewPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: template.thumbnail }}
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{template.name}</Text>
        <Text style={styles.price}>{currencyFormat(template.price)}</Text>
        <Text numberOfLines={3} style={styles.description}>
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
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: InterBold,
    color: '#333',
  },
  price: {
    fontSize: 22,
    marginBottom: 12,
    fontFamily: InterBold,
    color: '#d32f2f',
  },
  description: {
    fontSize: 16,
    color: '#777',
    marginBottom: 16,
    fontFamily: InterRegular,
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  previewButton: {
    backgroundColor: '#424242',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: InterBold,
    textAlign: 'center',
  },
});
